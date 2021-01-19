const { vuexfireMutations } = require('vuexfire')
const { firestore } = require('~/plugins/firebase.js')
const cfCreatives = require('~/classes/cfCreatives.js')

export const state = () => ({
  shops: []
})

export const mutations = {
  ...vuexfireMutations
}

export const actions = {
  /*
    ブランドの追加
  */
  addCreative ({ commit, state, rootGetters }, creative) {
    console.log('    XF CREATIVES ACT ADD creative ')
    const shopsRef = firestore.collection('xcreatives')
    shopsRef.doc(creative.id).withConverter(cfCreatives.ConvCCreative).set(creative)
  }
}

export const getters = {
  refCreativeById: () => (cid) => {
    return firestore.collection('xcreatives').doc(cid)
  },
  refCreativesByIds10: () => (cIds10) => {
    return firestore.collection('xcreatives').where('id', 'in', cIds10)
  }
}
