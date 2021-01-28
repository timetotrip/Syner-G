import ProductView from '~/store/xp/xdpproductview.js'
const cfBrands = require('~/classes/cfBrands.js')
const productView = new ProductView()
export default class {
  constructor () {
    this.state = {
      ...productView.state
    }
    this.mutations = {
      ...productView.mutations
    }
    this.actions = {
      ...productView.actions,
      addProduct ({ commit, state, rootGetters }, pname) {
        console.log('  XDC BRAND ACT Add product ' + pname)
        // クラス生成と初期化
        const product = new cfBrands.CProduct(pname)
        const bid = rootGetters['xd/create/xdcbrand/cBrandId']
        const uid = rootGetters['xd/general/xdgcuser/cUserId']
        // ID発番
        product.id = bid + Math.random().toString(32).substring(2)
        // クリエイターとブランドのID紐づけ
        product.creater = uid
        product.brand = bid
        // 日時設定
        product.dateCreate = new Date()
        product.dateUpdate = new Date()
        // Firestore追加
        this.dispatch('xf/xfbrands/addProduct', product, { root: true })
      },
      updateProduct ({ commit, state, rootGetters }, pAfter) {
        console.log('  XDC BRAND ACT update product ' + pAfter.name)
        pAfter.dateUpdate = new Date()
        this.dispatch('xf/xfbrands/updateProduct', pAfter, { root: true })
      },
      /*
        プロダクトに画像追加
      */
      pushProductCreative ({ commit, state, rootGetters }, { bid, pid, cid, FILE }) {
        console.log('  XDC PRODUCT ACT pushProductCreative ' + pid)
        const cIds = state.cProducts[pid].creativeIds.slice()
        cIds.push(cid)
        const cBrandRef = rootGetters['xf/xfbrands/refProductById']({ bid, pid })
        cBrandRef.update({ creativeIds: cIds, dateUpdate: new Date() })
        this.dispatch(`${state.sPath}/uploadCreatives`, { [cid]: FILE }, { root: true })
      },
      updateProductTopImage ({ commit, state, rootGetters }, { bid, pid, cid }) {
        console.log('  XDC PRODUCT ACT updateProductTopImage ' + pid)
        const cBrandRef = rootGetters['xf/xfbrands/refProductById']({ bid, pid })
        cBrandRef.update({ topimage: cid, dateUpdate: new Date() })
      }
    }
    this.getters = {
      ...productView.getters
    }
  }
}
