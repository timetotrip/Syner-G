import ShopView from '~/store/xd/permit/xdpshopview.js'
const shopView = new ShopView()

const state = {
  ...shopView.state
}
const mutations = {
  ...shopView.mutations
}
const actions = {
  ...shopView.actions
}
const getters = {
  ...shopView.getters
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
