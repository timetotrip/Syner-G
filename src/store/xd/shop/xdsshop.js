import ShopView from '~/store/xp/xdpshopview.js'
import BrandView from '~/store/xp/xdpbrandview.js'
import ProductView from '~/store/xp/xdpproductview.js'
import CreativeEdit from '~/store/xp/xdpcreativeedit.js'
const shopView = new ShopView()
const brandView = new BrandView()
const productView = new ProductView()
const creativeEdit = new CreativeEdit()

const state = {
  sPath: 'xd/shop/xdsshop',
  ...shopView.state,
  ...brandView.state,
  ...productView.state,
  ...creativeEdit.state
}
const mutations = {
  ...shopView.mutations,
  ...brandView.mutations,
  ...productView.mutations,
  ...creativeEdit.mutations
}
const actions = {
  ...shopView.actions,
  ...brandView.actions,
  ...productView.actions,
  ...creativeEdit.actions
}
const getters = {
  ...shopView.getters,
  ...brandView.getters,
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
