import ShopView from '~/store/xp/xdpshopview.js'
const cfShops = require('~/classes/cfShops.js')
const shopView = new ShopView()
const ngShopIds = [
  'create',
  'index',
  'offical'
]

export default class {
  constructor () {
    this.state = {
      ...shopView.state,
      sidValiState: ''
    }
    this.mutations = {
      ...shopView.mutations,
      sidValiState (state, valiState) {
        state.sidValiState = valiState
      }
    }
    this.actions = {
      ...shopView.actions,
      /*
        ブランドID重複チェック
      */
      sidValiSet ({ commit, state, rootGetters }, sid) {
        console.log('  XDC SHOP ACT start vali sid ' + sid)
        if (ngShopIds.includes(sid)) {
          commit('sidValiState', 'ng')
        } else {
          commit('sidValiState', sid)
          const bidRef = rootGetters['xf/xfshops/refShopById'](sid)
          bidRef.get().then((snap) => {
            if (snap.exists) {
              console.log('   XDC SHOP SNP error vali sid ' + sid)
              commit('sidValiState', 'ng')
            } else {
              console.log('   XDC SHOP SNP ok vali sid ' + sid)
              commit('sidValiState', 'ok')
            }
          })
        }
      },
      /*
        ブランドID重複チェック リセット
      */
      sidValiReset ({ commit, state, rootGetters }) {
        console.log('  XDC SHOP ACT reset vali bid ')
        commit('sidValiState', '')
      },
      /*
        ブランド追加
        - ログインチェック
        - xfbrandsの更新→xfusersの更新
      */
      makeBrandShop ({ commit, state, rootGetters }, { sid, sname, bid }) {
        console.log('  XDC Shop ACT Add Shop ' + sid + sname)
        const cUserId = rootGetters['xd/general/xdgcuser/cUserId']
        const cBrand = rootGetters[`${state.sPath}/cBrand`]
        if (cUserId === '') {
          return 0
        } else if (cBrand === null) {
          return 0
        } else {
          const shop = new cfShops.CShop(sid, sname, cUserId)
          const sfsLogo = new cfShops.CsFront('sLogo')
          sfsLogo.creativeIds.push(cBrand.logo)
          const sfSlide = new cfShops.CsFront('Slide')
          sfSlide.creativeIds = cBrand.creativeIds.slice()
          const sfprAll = new cfShops.CsFront('prAll')
          shop.front = [sfsLogo, sfSlide, sfprAll]
          shop.brand = bid
          this.dispatch('xf/xfshops/addShop', shop, { root: true })
          this.dispatch(`${state.sPath}/setSidToBrand`, { bid, sid }, { root: true })
          this.dispatch('xd/general/xdgcuser/addMngShop', sid, { root: true })
        }
      }
    }
    this.getters = {
      ...shopView.getters,
      sidValiState: (state, getters, rootState, rootGetters) => {
        return state.sidValiState
      }
    }
  }
}
