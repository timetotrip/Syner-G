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
        const pid = pAfter.id
        const pBefor = state.cProducts[pid]
        const fileTask = {}
        // 日時設定
        pAfter.dateUpdate = new Date()
        for (const cid in pBefor.creatives) {
          if (typeof pAfter.creatives[cid] === 'undefined') {
            // todo storage 削除処理
          }
        }
        for (const cid in pAfter.creatives) {
          if (pAfter.creatives[cid].type === 'FILE') {
            fileTask[cid] = pAfter.creatives[cid].file
            pAfter.creatives[cid].uploadingRef()
          }
        }
        this.dispatch('xf/xfbrands/updateProduct', pAfter, { root: true })
        this.dispatch(`${state.sPath}/uploadCreatives`, fileTask, { root: true })
      }
    }
    this.getters = {
      ...productView.getters
    }
  }
}
