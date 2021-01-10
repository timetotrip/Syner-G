const cfBrands = require('~/classes/cfBrands.js')
let dXdcCProducts = []

export const state = () => ({
  pList: {}
})

export const mutations = {
  setPList (state, plist) {
    state.pList = plist
  },
  addPList (state, product) {
    state.pList[product.id] = product
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
    product.dateCreate = new Date()
    product.dateUpdate = new Date()
    // 表示用データ追加
    commit('addPList', product)
    // Firestore追加
    this.dispatch('xf/xfbrands/addProduct', product, { root: true })
    // 選択状態の変更
    // commit('setCProductId', product.id)
  },
  setPList ({ commit, state, rootGetters }, bid) {
    console.log('  XDC BRAND ACT Set PLIST ' + bid)
    const plistRef = rootGetters['xf/xfbrands/refBrandProducts'](bid)
    dXdcCProducts.push(plistRef.withConverter(cfBrands.ConvCProduct).onSnapshot((snap) => {
      const plist = {}
      if (!snap.empty) {
        console.log('  XDC BRAND SNP Set PLIST ' + bid)
        snap.forEach((docs) => {
          plist[docs.data().id] = docs.data()
        })
      }
      commit('setPList', plist)
    }))
  },
  resetPList ({ commit, state, rootGetters }) {
    console.log('  XDC BRAND ACT Reset PLIST ')
    dXdcCProducts.forEach((f) => { f() })
    dXdcCProducts = []
    commit('setPList', {})
  }
}

export const getters = {
  pList: (state, getters, rootState, rootGetters) => {
    return state.pList
  }
}
