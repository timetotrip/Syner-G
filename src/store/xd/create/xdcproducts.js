// const moment = require('moment')
const cfBrands = require('~/classes/cfBrands.js')
// let dXdcCProducts = []

export const state = () => ({
  /*
  bidValiState: '',
  cBrand: null,
  cBrandPermit: '' // MNG or EDT or VEW or NON
  */
  pList: {},
  cProductId: ''
})

export const mutations = {
  /*
  bidValiState (state, result) {
    state.bidValiState = result
  },
  setCbrand (state, { cBrand, permit }) {
    state.cBrand = cBrand
    state.cBrandPermit = permit
  } */
  setPList (state, plist) {
    state.pList = plist
  },
  addPList (state, product) {
    state.pList[product.id] = product
  },
  setCProductId (state, pid) {
    state.cProductId = pid
  }
}

export const actions = {
  addProduct ({ commit, state, rootGetters }, pname) {
    console.log('  XDC BRAND ACT Add product ' + pname)
    // クラス生成と初期化
    const product = new cfBrands.CProduct(pname)
    // ID発番
    product.id = Math.random().toString(32).substring(2)
    // クリエイターとブランドのID紐づけ
    product.creater = rootGetters['xd/general/xdgcuser/cUserId']
    product.brand = rootGetters['xd/create/xdcbrand/cBrandId']
    // 日時設定
    // product.dateCreate = moment().format()
    // product.dateUpdate = moment().format()
    product.dateCreate = 'NOW'
    product.dateUpdate = 'NOW'
    // 表示用データ追加
    commit('addPList', product)
    // Firestore追加
    this.dispatch('xf/xfbrands/addProduct', product, { root: true })
    // 選択状態の変更
    commit('setCProductId', product.id)
  },
  setPList ({ commit, state, rootGetters }, { page, ppp }) {
  },
  resetPList ({ commit, state, rootGetters }) {
  },
  setCProductId ({ commit, state, rootGetters }, { pid }) {
  },
  resetCProductId ({ commit, state, rootGetters }) {
  }
  /*
    ブランド追加
    - ログインチェック
    - xfbrandsの更新→xfusersの更新
  */
  /*
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
  */
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
  }, */
  /*
    カレントブランドのリセット
  *//*
  resetCBrand ({ commit, state, rootGetters }) {
    console.log('  XDC BRAND ACT reset Cbrand ')
    dXdcCBrand.forEach((f) => { f() })
    dXdcCBrand = []
  } */
}

export const getters = {
  pList: (state, getters, rootState, rootGetters) => {
    return state.pList
  },
  cProductId: (state, getters, rootState, rootGetters) => {
    return state.cProductId
  },
  cProduct: (state, getters, rootState, rootGetters) => {
    return state.pList[state.cProductId]
  }
  /*
  bidValiState: (state, getters, rootState, rootGetters) => {
    return state.bidValiState
  },
  cBrand: (state, getters, rootState, rootGetters) => {
    return state.cBrand
  },
  cBrandPermit: (state, getters, rootState, rootGetters) => {
    return state.cBrandPermit
  } */
}
