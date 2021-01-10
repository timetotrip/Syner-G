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
    プロダクトの追加
  */
  addProduct ({ commit, state, rootGetters }, product) {
    console.log('    XF ACT BRANDS ADD Product ' + product.name)
    const productsRef = firestore.collection('xbrands').doc(product.brand).collection('products')
    productsRef.doc(product.id).withConverter(cfBrands.ConvCProduct).set(product)
  }
  /*
    プロダクト+画像の追加
  * /
  addProductWithI ({ commit, state, rootGetters }, product) {
    console.log('    XF ACT BRANDS ADD Product with Image' + product.name)
    const iFile = product.ifile
    const randomName = Math.random().toString(32).substring(2)
    const storageRef = firestorage.ref(`xbrands/${product.bid}/${product.id}/${randomName}`)
    const uploadTask = storageRef.put(iFile)
    uploadTask.on('state_changed',
      (snapshot) => { /* Progress * / },
      (err) => { console.log(err) },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log('    XF SNP BRANDS ADD Product with Image -- Uplode done' + product.name)
          product.setIfile(url)
          actions.addProduct({ commit, state, rootGetters }, product)
        })
      }
    )
  } */
}

export const getters = {
  refBrandById: () => (bid) => {
    return firestore.collection('xbrands').doc(bid)
  },
  refBrandProducts: () => (bid) => {
    return firestore.collection('xbrands').doc(bid).collection('products')
  }
  /*
  ownBrandsRef: () => (uid) => {
    return firestore.collection('xbrands').where('owner', '==', uid)
  },
  getBrandProductsRef: () => (bid) => {
    console.log('    XF GET BRANDS getBrandProductsREF ' + bid)
    return firestore.collection('xbrands').doc(bid).collection('products')
  }
  /*
  getBrandProducts: () => (bid) => {
    console.log('    XF GET BRANDS getBrandProducts ' + bid)
    firestore.collection('xbrands').doc(bid).collection('products').withConverter(cfBrands.ConvCProduct).get().then((snap) => {
      console.log('    XF SNP BRANDS getBrandProducts ' + bid)
      const products = []
      snap.forEach((docs) => {
        // console.log(docs.data())
        products.push(docs.data())
      })
      console.log(products)
      return products
    })
    return []
  } */
}
