const { vuexfireMutations } = require('vuexfire')
const { firestore } = require('~/plugins/firebase.js')
const cfBrands = require('~/classes/cfBrands.js')

export const state = () => ({
  brands: []
})

export const mutations = {
  ...vuexfireMutations
}

export const actions = {
  /*
    ブランドの追加
  */
  addBrand ({ commit, state, rootGetters }, brand) {
    console.log('    XF BRANDS ACT ADD Brand ' + brand.name)
    const brandsRef = firestore.collection('xbrands')
    brandsRef.doc(brand.id).withConverter(cfBrands.ConvCBrand).set(brand)
  },
  /*
    ブランドの更新
  */
  updateBrand ({ commit, state, rootGetters }, brand) {
    console.log('    XF BRANDS ACT Update Brand ' + brand.name)
    const brandsRef = firestore.collection('xbrands')
    brandsRef.doc(brand.id).withConverter(cfBrands.ConvCBrand).set(brand)
  },
  /*
    プロダクトの追加
  */
  addProduct ({ commit, state, rootGetters }, product) {
    console.log('    XF ACT BRANDS ADD Product ' + product.name)
    const productsRef = firestore.collection('xbrands').doc(product.brand).collection('products')
    productsRef.doc(product.id).withConverter(cfBrands.ConvCProduct).set(product)
  },
  /*
    プロダクトの更新
  */
  updateProduct ({ commit, state, rootGetters }, product) {
    console.log('    XF ACT BRANDS UPDATE Product ' + product.name)
    const productsRef = firestore.collection('xbrands').doc(product.brand).collection('products')
    productsRef.doc(product.id).withConverter(cfBrands.ConvCProduct).set(product)
  }
}

export const getters = {
  refBrandById: () => (bid) => {
    return firestore.collection('xbrands').doc(bid)
  },
  refBrandProducts: () => (bid) => {
    return firestore.collection('xbrands').doc(bid).collection('products')
  },
  refProductById: () => ({ bid, pid }) => {
    console.log('REF' + pid)
    return firestore.collection('xbrands').doc(bid).collection('products').doc(pid)
  }
}
