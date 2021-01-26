import ShopView from '~/store/xd/permit/xdpshopview.js'
import ProductView from '~/store/xd/permit/xdpproductview.js'
import CreativeView from '~/store/xd/permit/xdpcreativeview.js'
const shopView = new ShopView()
const productView = new ProductView()
const creativeView = new CreativeView()

const state = {
  sPath: 'xd/shop/xdsshop',
  ...shopView.state,
  ...productView.state,
  ...creativeView.state
}
const mutations = {
  ...shopView.mutations,
  ...productView.mutations,
  ...creativeView.mutations
}
const actions = {
  ...shopView.actions,
  ...productView.actions,
  ...creativeView.actions
}
const getters = {
  ...shopView.getters,
  ...productView.getters,
  ...creativeView.getters
}

export default {
  sPath: 'xd/shop/xdsshop',
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
