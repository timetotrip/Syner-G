const cfShops = require('~/classes/cfShops.js')
let dXdcCShop = []
const ngShopIds = [
  'create',
  'index',
  'offical'
]

export const state = () => ({
  sidValiState: '',
  cShop: null,
  cShopPermit: '' // MNG or EDT or VEW or NON
})

export const mutations = {
  sidValiState (state, result) {
    state.sidValiState = result
  },
  setCShop (state, { cShop, permit }) {
    state.cShop = cShop
    state.cShopPermit = permit
  }
}

export const actions = {
  /*
    ブランドID重複チェック
  */
  sidValiSet ({ commit, state, rootGetters }, sid) {
    console.log('  XDC SHOP ACT start vali sid ' + sid)
    if (ngShopIds.includes(sid)) {
      commit('sidValiState', 'ng')
    } else {
      commit('sidValiState', sid)
      const bidRef = rootGetters['xf/xfshops/refShopById'](sid)
      bidRef.get().then((snap) => {
        if (snap.exists) {
          console.log('   XDC SHOP SNP error vali sid ' + sid)
          commit('sidValiState', 'ng')
        } else {
          console.log('   XDC SHOP SNP ok vali sid ' + sid)
          commit('sidValiState', 'ok')
        }
      })
    }
  },
  /*
    ブランドID重複チェック リセット
  */
  sidValiReset ({ commit, state, rootGetters }) {
    console.log('  XDC SHOP ACT reset vali bid ')
    commit('sidValiState', '')
  },
  /*
    ブランド追加
    - ログインチェック
    - xfbrandsの更新→xfusersの更新
  */
  addBrandShop ({ commit, state, rootGetters }, { sid, sname, bid }) {
    console.log('  XDC Shop ACT Add Shop ' + sid + sname)
    const cUserId = rootGetters['xd/general/xdgcuser/cUserId']
    if (cUserId === '') {
      console.log('  XDC cUserId ACT Add Shop - done no login')
    }
    const shop = new cfShops.CShop(sid, sname, cUserId)
    shop.brands[bid] = sname
    this.dispatch('xf/xfshops/addShop', shop, { root: true })
    this.dispatch('xd/create/xdcbrand/addBrandShop', { bid, sid }, { root: true })
    this.dispatch('xd/general/xdgcuser/addMngShop', sid, { root: true })
  },
  /*
    カレントショップの設定
  */
  setCShop ({ commit, state, rootGetters }, sid) {
    console.log('  XDC SHOP Set CSHOP ' + sid)
    if (!rootGetters['xd/general/xdgcuser/hasShopPermit'](sid, 'VEW')) {
      // 権限チェック
      console.log('  XDC SHOP Set CSHOP NO Permit error ' + sid)
      return 0
    } else if (state.cShop != null) {
      // 既に設定済み場合は何もしない
      if (state.cShop.id === sid) {
        console.log('  XDC SHOP Set CSHOP ARLADY NTD ' + sid)
        return 0
      }
    }
    // 過去の設定をリセット
    dXdcCShop.forEach((f) => { f() })
    dXdcCShop = []
    // 現在の権限設定を取得
    const pmt = rootGetters['xd/general/xdgcuser/shopPermit'](sid)
    // ブランド 参照の取得
    const cShopRef = rootGetters['xf/xfshops/refShopById'](sid)
    // イベントハンドラの設定
    dXdcCShop.push(cShopRef.withConverter(cfShops.ConvCShop).onSnapshot((snap) => {
      if (!snap.empty) {
        console.log('  XDC SHOP Set CSHOP SET' + sid)
        commit('setCShop', { cShop: snap.data(), permit: pmt })
      } else {
        console.log('  XDC SHOP Set CSHOP ERROR CANT FIND' + sid)
      }
    }))
  },
  /*
    カレントショップのリセット
  */
  resetCShop ({ commit, state, rootGetters }) {
    console.log('  XDC Shop ACT reset CShop ')
    dXdcCShop.forEach((f) => { f() })
    dXdcCShop = []
  }
}

export const getters = {
  sidValiState: (state, getters, rootState, rootGetters) => {
    return state.sidValiState
  },
  cShop: (state, getters, rootState, rootGetters) => {
    return state.cShop
  }
}
