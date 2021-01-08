const { vuexfireMutations } = require('vuexfire')
const { firestore } = require('~/plugins/firebase.js')
/*
const cfUsers = require('~/classes/cfUsers.js')
const cfBrands = require('~/classes/cfBrands.js')
*/
export const state = () => ({
  users: []
})

export const mutations = {
  ...vuexfireMutations
}

export const actions = {
  /*
    参照の設定
    - ※ 削除検討
  *//*
  setUsersRef: firestoreAction('xusers', ({ bindFirestoreRef }, ref) => {
    console.log('    XF USERS ACT setUsersRef')
    bindFirestoreRef('xusers', ref)
  }), */
  /*
    ユーザー追加  ※※※※※※※※※※見直す後程
  *//*
  addUser ({ commit, state, rootGetters }, user) {
    console.log('    XF USERS ACT addUser ' + user.name)
    const UsersRef = firestore.collection('xusers')
    UsersRef.doc(user.id).withConverter(cfUsers.ConvCUser).set(user)
  } */
  /*
    オウンブランドの更新
  */
  /*
  updateOwnBrand ({ commit, state, rootGetters }, cUserId) {
    console.log('    XF USERS ACT updateOwnBrand ' + cUserId)
    // Firestore 参照
    const ownBrandsRef = rootGetters['xfbrands/ownBrandsRef'](cUserId)
    // 所有中のブランド一覧の作成
    ownBrandsRef.withConverter(cfBrands.ConvCBrand).get().then((snap) => {
      console.log('    XF USERS SNAP updateOwnBrand ' + cUserId)
      const ownBrands = []
      snap.forEach((docs) => { ownBrands.push(docs.id) })
      firestore.collection('xusers').doc(cUserId).update({ ownBrands })
    })
  } */
}
export const getters = {
  refCUser: (state, getters, rootState, rootGetters) => (token) => {
    const id = token
    return firestore.collection('xusers').doc(id)
  }
}
