const cfShops = require('~/classes/cfShops.js')
const cfBrands = require('~/classes/cfBrands.js')
let dXdsCShop = []
export const state = () => ({
  cShop: null,
  cProducts: []
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
  },
  pushCProducts (state, cProducts) {
    const newProducts = Object.assign({}, state.cProducts)
    for (const pid in cProducts) {
      newProducts[pid] = cProducts[pid]
    }
    state.cProducts = newProducts
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
      }))
    }
    // TODO プロダクトショップを作るタイミングでここに追記
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
  cProducts: (state, getters, rootState, rootGetters) => {
    return state.cProducts
  }
}
