import ShopEdit from '~/store/xd/permit/xdpshopedit.js'
const shopEdit = new ShopEdit()

const state = {
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
