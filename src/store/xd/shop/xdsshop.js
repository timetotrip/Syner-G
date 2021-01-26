const cfShops = require('~/classes/cfShops.js')
const cfBrands = require('~/classes/cfBrands.js')
const cfCreatives = require('~/classes/cfCreatives.js')
const pathLocading = ''
let dXdsCShop = []
export const state = () => ({
  cShop: null,
  cProducts: [],
  cCreatives: {}
})

export const mutations = {
  setCShop (state, cShop) {
    state.cShop = cShop
  },
  setCProducts (state, cProducts) {
    state.cProducts = cProducts
  },
  resetCProducts (state) {
    state.cProducts = []
    state.cCreatives = {}
  },
  pushCProducts (state, cProducts) {
    const newProducts = Object.assign({}, state.cProducts)
    for (const pid in cProducts) {
      newProducts[pid] = cProducts[pid]
    }
    state.cProducts = newProducts
  },
  pushCCreative (state, creative) {
    const newCreatives = Object.assign({}, state.cCreatives)
    newCreatives[creative.id] = creative
    state.cCreatives = newCreatives
  }
}

export const actions = {
  /*
    カレントSHOPの設定
  */
  setCShop ({ commit, state, rootGetters }, sid) {
    console.log('  XDC SHOP Set CSHOP ' + sid)
    if (state.cShop != null) {
      // 既に設定済み場合は何もしない
      if (state.cShop.id === sid) {
        console.log('  XDC SHOP Set CSHOP ARLADY NTD ' + sid)
        return 0
      }
    }
    // 過去の設定をリセット
    dXdsCShop.forEach((f) => { f() })
    dXdsCShop = []
    commit('resetCProducts')
    // ブランド 参照の取得
    const cShopRef = rootGetters['xf/xfshops/refShopById'](sid)
    // イベントハンドラの設定
    dXdsCShop.push(cShopRef.withConverter(cfShops.ConvCShop).onSnapshot((snap) => {
      if (!snap.empty) {
        console.log('  XDC SHOP Set CSHOP SET' + sid)
        commit('setCShop', snap.data())
      } else {
        console.log('  XDC SHOP Set CSHOP ERROR CANT FIND' + sid)
      }
    }))
  },
  setCProducts ({ commit, state, rootGetters }, sid) {
    console.log('  XDC SHOP Set CPRODUCTS ' + sid)
    if (state.cShop === null) {
      return 0
    } else if (state.cShop.id !== sid) {
      return 0
    } else if (state.cProducts.length !== 0) {
      // 既に設定済み場合は何もしない
      console.log('  XDC SHOP Set CPRODUCTS ARLADY NTD ' + sid)
      return 0
    }
    for (const bid in state.cShop.brands) {
      const plistRef = rootGetters['xf/xfbrands/refBrandProducts'](bid)
      dXdsCShop.push(plistRef.withConverter(cfBrands.ConvCProduct).onSnapshot((snap) => {
        const plist = {}
        if (!snap.empty) {
          console.log('  XDC SHOP SNP Set CPRODUCTS ' + bid)
          snap.forEach((docs) => {
            plist[docs.data().id] = docs.data()
          })
        }
        commit('pushCProducts', plist)
        this.dispatch('xd/shop/xdsshop/setProductsCreatives', plist, { root: true })
      }))
    }
    // TODO プロダクトショップを作るタイミングでここに追記
    //
    // ////
  },
  setProductsCreatives ({ commit, state, rootGetters }, plist) {
    console.log('  XDC SHOP Set CPRODUCTS CREATIVE ')
    let cIds = []
    for (const pid in plist) {
      for (const cid in plist[pid].creatives) {
        if (typeof state.cCreatives[cid] !== 'undefined') {
          // already
        } else if (cIds.includes(cid)) {
          // already
        } else {
          cIds.push(cid)
        }
      }
    }
    while (cIds.length > 0) {
      const cIds10 = cIds.slice(0, 10)
      const cIds10Ref = rootGetters['xf/xfcreatives/refCreativesByIds10'](cIds10)
      dXdsCShop.push(cIds10Ref.withConverter(cfCreatives.ConvCCreative).onSnapshot((snaps) => {
        snaps.forEach((snap) => {
          console.log('  XDC SHOP Set CREATIVE ' + snap.data().id)
          commit('pushCCreative', snap.data())
        })
      }))
      cIds = cIds.slice(10)
    }
  },
  /*
    カレントSHOPのリセット
  */
  resetCShop ({ commit, state, rootGetters }) {
    console.log('  XDC BRAND ACT reset Cbrand ')
    dXdsCShop.forEach((f) => { f() })
    dXdsCShop = []
    commit('resetCProducts')
  }
}

export const getters = {
  cShop: (state, getters, rootState, rootGetters) => {
    return state.cShop
  },
  cShopName: (state, getters, rootState, rootGetters) => {
    if (state.cShop === null) {
      return ''
    }
    return state.cShop.name
  },
  cProducts: (state, getters, rootState, rootGetters) => {
    return state.cProducts
  },
  cProCreatives: (state, getters, rootState, rootGetters) => (pid) => {
    if (typeof state.cProducts[pid] === 'undefined') {
      return {}
    }
    return state.cProducts[pid].creatives
  },
  cProCreativeIds: (state, getters, rootState, rootGetters) => (pid) => {
    const creatives = rootGetters['xd/shop/xdsshop/cProCreatives'](pid)
    if (creatives === {}) {
      return []
    }
    return Object.keys(creatives)
  },
  cCrePath: (state, getters, rootState, rootGetters) => (cid) => {
    if (state.cCreatives === {}) {
      return pathLocading
    } else if (typeof state.cCreatives[cid] === 'undefined') {
      return pathLocading
    }
    return state.cCreatives[cid].url
  },
  cProTopCid: (state, getters, rootState, rootGetters) => (pid) => {
    return state.cProducts[pid].topimage
  },
  cProHasTopCre: (state, getters, rootState, rootGetters) => (pid) => {
    /*
    if (typeof state.cProducts[pid] === 'undefined') {
      return false
    } else if (state.cProducts[pid].topimage !== '') {
      return true
    }
    const pCreativeIds = rootGetters['xd/shop/xdsshop/cProCreativeIds'](pid)
    if (pCreativeIds.length > 0) {
      return true
    }
    return false
    */
    return false
  },
  cProTopCrePath: (state, getters, rootState, rootGetters) => (pid) => {
    if (typeof state.cProducts[pid] === 'undefined') {
      return ''
    } else if (state.cProducts[pid].topimage !== '') {
      return state.cProducts[pid].topimage
    }
    const pCreativeIds = rootGetters['xd/shop/xdsshop/cProCreativeIds'](pid)
    if (pCreativeIds.length > 0) {
      return rootGetters['xd/shop/xdsshop/cCrePath'](pCreativeIds[0])
    }
    return pathLocading
  }
}
