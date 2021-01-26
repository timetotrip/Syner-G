import ShopView from '~/store/xp/xdpshopview.js'
import ProductView from '~/store/xp/xdpproductview.js'
import CreativeEdit from '~/store/xp/xdpcreativeedit.js'
const shopView = new ShopView()
const productView = new ProductView()
const creativeEdit = new CreativeEdit()

const state = {
  sPath: 'xd/shop/xdsshop',
  ...shopView.state,
  ...productView.state,
  ...creativeEdit.state
}
const mutations = {
  ...shopView.mutations,
  ...productView.mutations,
  ...creativeEdit.mutations
}
const actions = {
  ...shopView.actions,
  ...productView.actions,
  ...creativeEdit.actions
}
const getters = {
  ...shopView.getters,
  ...productView.getters,
  ...creativeEdit.getters
}

export default {
  sPath: 'xd/shop/xdsshop',
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
