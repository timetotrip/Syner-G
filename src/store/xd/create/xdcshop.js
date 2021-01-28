import ShopEdit from '~/store/xp/xdpshopedit.js'
import BrandEdit from '~/store/xp/xdpbrandedit.js'
import ProductEdit from '~/store/xp/xdpproductedit.js'
import CreativeEdit from '~/store/xp/xdpcreativeedit.js'
const shopEdit = new ShopEdit()
const brandEdit = new BrandEdit()
const productEdit = new ProductEdit()
const creativeEdit = new CreativeEdit()

const state = {
  sPath: 'xd/create/xdcshop',
  ...shopEdit.state,
  ...brandEdit.state,
  ...productEdit.state,
  ...creativeEdit.stat
}
const mutations = {
  ...shopEdit.mutations,
  ...brandEdit.mutations,
  ...productEdit.mutations,
  ...creativeEdit.mutations
}
const actions = {
  ...shopEdit.actions,
  ...brandEdit.actions,
  ...productEdit.actions,
  ...creativeEdit.actions
}
const getters = {
  ...shopEdit.getters,
  ...brandEdit.getters,
  ...productEdit.getters,
  ...creativeEdit.getters
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
