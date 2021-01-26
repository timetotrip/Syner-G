import BrandEdit from '~/store/xp/xdpbrandedit.js'
const brandEdit = new BrandEdit()

const state = {
  sPath: 'xd/create/xdcbrand',
  ...brandEdit.state
}
const mutations = {
  ...brandEdit.mutations
}
const actions = {
  ...brandEdit.actions
}
const getters = {
  ...brandEdit.getters
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
