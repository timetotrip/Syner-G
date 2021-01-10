const { firestorage } = require('~/plugins/firebase.js')
/*
const cfUsers = require('~/classes/cfUsers.js')
const cfBrands = require('~/classes/cfBrands.js')
*/
export const state = () => ({
})

export const mutations = {
}

export const actions = {
}

export const getters = {
  refProductCreative: (state, getters, rootState, rootGetters) => (bid, pid, cid) => {
    return firestorage.ref(`creatives/${bid}/${pid}/${cid}`)
  }
}
