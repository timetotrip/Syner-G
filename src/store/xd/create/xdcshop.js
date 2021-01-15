const cfShops = require('~/classes/cfShops.js')
// let dXdcCShop = []
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
  setCbrand (state, { cShop, permit }) {
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
    this.dispatch('xd/general/xdgcuser/addMngShop', sid, { root: true })
  }
  /*
    カレントブランドの設定
  */
  /*
  setCBrand ({ commit, state, rootGetters }, bid) {
    console.log('  XDC BRAND Set Cbrand ' + bid)
    if (!rootGetters['xd/general/xdgcuser/hasBrandPermit'](bid, 'VEW')) {
      // 権限チェック
      console.log('  XDC BRAND Set Cbrand NO Permit error ' + bid)
      return 0
    } else if (state.cBrand != null) {
      // 既に設定済み場合は何もしない
      if (state.cBrand.id === bid) {
        console.log('  XDC BRAND Set Cbrand ARLADY NTD ' + bid)
        return 0
      }
    }
    // 過去の設定をリセット
    dXdcCBrand.forEach((f) => { f() })
    dXdcCBrand = []
    // 現在の権限設定を取得
    const pmt = rootGetters['xd/general/xdgcuser/brandPermit'](bid)
    // ブランド 参照の取得
    const cBrandRef = rootGetters['xf/xfbrands/refBrandById'](bid)
    // イベントハンドラの設定
    dXdcCBrand.push(cBrandRef.withConverter(cfBrands.ConvCBrand).onSnapshot((snap) => {
      if (!snap.empty) {
        console.log('  XDC BRAND Set Cbrand SET' + bid)
        commit('setCbrand', { cBrand: snap.data(), permit: pmt })
      } else {
        console.log('  XDC BRAND Set Cbrand ERROR CANT FIND' + bid)
      }
    }))
  },
  */
  /*
    カレントブランドのリセット
  */
  /*
  resetCBrand ({ commit, state, rootGetters }) {
    console.log('  XDC BRAND ACT reset Cbrand ')
    dXdcCBrand.forEach((f) => { f() })
    dXdcCBrand = []
  }
  */
}

export const getters = {
  sidValiState: (state, getters, rootState, rootGetters) => {
    return state.sidValiState
  },
  cShop: (state, getters, rootState, rootGetters) => {
    return state.cShop
  }
  /*,
  cBrandId: (state, getters, rootState, rootGetters) => {
    if (state.cBrand === null) {
      return ''
    }
    return state.cBrand.id
  },
  cBrandPermit: (state, getters, rootState, rootGetters) => {
    return state.cBrandPermit
  }
  */
}
