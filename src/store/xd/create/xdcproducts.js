import ProductEdit from '~/store/xp/xdpproductedit.js'
// const sPath = 'xd/create/xdcshop'
const productEdit = new ProductEdit()

const state = {
  sPath: 'xd/create/xdcproducts',
  ...productEdit.state
}
const mutations = {
  ...productEdit.mutations
}
const actions = {
  ...productEdit.actions
}
const getters = {
  ...productEdit.getters
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
