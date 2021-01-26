import ShopEdit from '~/store/xp/xdpshopedit.js'
// const sPath = 'xd/create/xdcshop'
const shopEdit = new ShopEdit()

const state = {
  sPath: 'xd/create/xdcshop',
  ...shopEdit.state
}
const mutations = {
  ...shopEdit.mutations
}
const actions = {
  ...shopEdit.actions
}
const getters = {
  ...shopEdit.getters
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
