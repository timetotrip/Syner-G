import BrandView from '~/store/xp/xdpbrandview.js'
const cfBrands = require('~/classes/cfBrands.js')
const brandView = new BrandView()
const ngBrandIds = [
  'create',
  'index',
  'offical'
]
export default class {
  constructor () {
    this.state = {
      ...brandView.state,
      bidValiState: ''
    }

    this.mutations = {
      ...brandView.mutations,
      bidValiState (state, result) {
        state.bidValiState = result
      }
    }

    this.actions = {
      ...brandView.actions,
      /*
        ブランドID重複チェック
      */
      bidValiSet ({ commit, state, rootGetters }, bid) {
        console.log('  XDC BRAD ACT start vali bid ' + bid)
        if (ngBrandIds.includes(bid)) {
          commit('bidValiState', 'ng')
        } else {
          commit('bidValiState', bid)
          const bidRef = rootGetters['xf/xfbrands/refBrandById'](bid)
          bidRef.get().then((snap) => {
            if (snap.exists) {
              console.log('   XDC BRAD SNP error vali bid ' + bid)
              commit('bidValiState', 'ng')
            } else {
              console.log('   XDC BRAD SNP ok vali bid ' + bid)
              commit('bidValiState', 'ok')
            }
          })
        }
      },
      /*
        ブランドID重複チェック リセット
      */
      bidValiReset ({ commit, state, rootGetters }) {
        console.log('  XDC BRAD ACT reset vali bid ')
        commit('bidValiState', '')
      },
      /*
        ブランド追加
        - ログインチェック
        - xfbrandsの更新→xfusersの更新
      */
      addBrand ({ commit, state, rootGetters }, { bid, bname }) {
        console.log('  XDC BRAND ACT Add brands ' + bid + bname)
        const cUserId = rootGetters['xd/general/xdgcuser/cUserId']
        if (cUserId === '') {
          console.log('  XDC cUserId ACT Add brands - done no login')
        }
        const brand = new cfBrands.CBrand(bid, bname, cUserId)
        this.dispatch('xf/xfbrands/addBrand', brand, { root: true })
        this.dispatch('xd/general/xdgcuser/addMngBrand', bid, { root: true })
        // commit('setCbrand', { cBrand: brand, permit: 'MNG' })
      },
      /*
        ブランドにショップ追加
      */
      addBrandShop ({ commit, state, rootGetters }, { bid, sid }) {
        console.log('  XDC BRAND ACT add Shop ')
        if (state.cBrand === null) {
          return 0
        }
        const cBrandRef = rootGetters['xf/xfbrands/refBrandById'](bid)
        cBrandRef.update({ shop: sid })
      },
      /*
        ブランドに画像追加
      */
      updateBrandImage ({ commit, state, rootGetters }, cRefsAfter) {
        console.log('  XDC BRAND ACT update brand image ' + state.cBrand.id)
        const bid = state.cBrand.id
        const cRefsBefore = state.cBrand.creatives
        const fileTask = {}
        for (const cid in cRefsBefore) {
          if (typeof cRefsAfter[cid] === 'undefined') {
            // todo storage 削除処理
          }
        }
        for (const cid in cRefsAfter) {
          if (cRefsAfter[cid].type === 'FILE') {
            fileTask[cid] = cRefsAfter[cid].file
            cRefsAfter[cid].uploadingRef()
          }
        }
        const cBrandRef = rootGetters['xf/xfbrands/refBrandById'](bid)
        cBrandRef.update({
          creatives: cRefsAfter,
          dateUpdate: new Date()
        })
        this.dispatch(`${state.sPath}/uploadCreatives`, fileTask, { root: true })
      }
    }

    this.getters = {
      ...brandView.getters,
      bidValiState: (state, getters, rootState, rootGetters) => {
        return state.bidValiState
      }
    }
  }
}
