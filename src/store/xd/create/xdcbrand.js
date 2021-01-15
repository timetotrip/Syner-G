const cfBrands = require('~/classes/cfBrands.js')
let dXdcCBrand = []
const ngBrandIds = [
  'create',
  'index',
  'offical'
]

export const state = () => ({
  bidValiState: '',
  cBrand: null,
  cBrandPermit: '' // MNG or EDT or VEW or NON
})

export const mutations = {
  bidValiState (state, result) {
    state.bidValiState = result
  },
  setCbrand (state, { cBrand, permit }) {
    state.cBrand = cBrand
    state.cBrandPermit = permit
  }
}

export const actions = {
  /*
    ブランドID重複チェック
  */
  bidValiSet ({ commit, state, rootGetters }, bid) {
    console.log('  XDC BRAD ACT start vali bid ' + bid)
    if (ngBrandIds.includes(bid)) {
      commit('bidValiState', 'ng')
    } else {
      commit('bidValiState', bid)
      const bidRef = rootGetters['xf/xfbrands/refBrandById'](bid)
      bidRef.get().then((snap) => {
        if (snap.exists) {
          console.log('   XDC BRAD SNP error vali bid ' + bid)
          commit('bidValiState', 'ng')
        } else {
          console.log('   XDC BRAD SNP ok vali bid ' + bid)
          commit('bidValiState', 'ok')
        }
      })
    }
  },
  /*
    ブランドID重複チェック リセット
  */
  bidValiReset ({ commit, state, rootGetters }) {
    console.log('  XDC BRAD ACT reset vali bid ')
    commit('bidValiState', '')
  },
  /*
    ブランド追加
    - ログインチェック
    - xfbrandsの更新→xfusersの更新
  */
  addBrand ({ commit, state, rootGetters }, { bid, bname }) {
    console.log('  XDC BRAND ACT Add brands ' + bid + bname)
    const cUserId = rootGetters['xd/general/xdgcuser/cUserId']
    if (cUserId === '') {
      console.log('  XDC cUserId ACT Add brands - done no login')
    }
    const brand = new cfBrands.CBrand(bid, bname, cUserId)
    this.dispatch('xf/xfbrands/addBrand', brand, { root: true })
    this.dispatch('xd/general/xdgcuser/addMngBrand', bid, { root: true })
    // commit('setCbrand', { cBrand: brand, permit: 'MNG' })
  },
  /*
    カレントブランドの設定
  */
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
  /*
    カレントブランドのリセット
  */
  resetCBrand ({ commit, state, rootGetters }) {
    console.log('  XDC BRAND ACT reset Cbrand ')
    dXdcCBrand.forEach((f) => { f() })
    dXdcCBrand = []
  },
  /*
    ブランドにショップ追加
  */
  addBrandShop ({ commit, state, rootGetters }, { bid, sid }) {
    console.log('  XDC BRAND ACT add Shop ')
    if (state.cBrand === null) {
      return 0
    }
    const cBrandRef = rootGetters['xf/xfbrands/refBrandById'](bid)
    cBrandRef.update({ shop: sid })
  }
}

export const getters = {
  bidValiState: (state, getters, rootState, rootGetters) => {
    return state.bidValiState
  },
  cBrand: (state, getters, rootState, rootGetters) => {
    return state.cBrand
  },
  cBrandId: (state, getters, rootState, rootGetters) => {
    if (state.cBrand === null) {
      return ''
    }
    return state.cBrand.id
  },
  cBrandPermit: (state, getters, rootState, rootGetters) => {
    return state.cBrandPermit
  }
}
