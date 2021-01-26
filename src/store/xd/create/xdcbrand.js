import BrandEdit from '~/store/xp/xdpbrandedit.js'
import ProductEdit from '~/store/xp/xdpproductedit.js'
import CreativeEdit from '~/store/xp/xdpcreativeedit.js'
const brandEdit = new BrandEdit()
const productEdit = new ProductEdit()
const creativeEdit = new CreativeEdit()

const state = {
  sPath: 'xd/create/xdcbrand',
  ...brandEdit.state,
  ...productEdit.state,
  ...creativeEdit.state
}
const mutations = {
  ...brandEdit.mutations,
  ...productEdit.mutations,
  ...creativeEdit.mutations
}
const actions = {
  ...brandEdit.actions,
  ...productEdit.actions,
  ...creativeEdit.actions
}
const getters = {
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
