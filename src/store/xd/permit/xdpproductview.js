// const cfShops = require('~/classes/cfShops.js')
const cfBrands = require('~/classes/cfBrands.js')
// const cfCreatives = require('~/classes/cfCreatives.js')
// const pathLocading = ''
let dXdpProduct = []
export default class {
  constructor () {
    this.state = {
      cProducts: []
    }

    this.mutations = {
      setCProducts (state, cProducts) {
        state.cProducts = cProducts
      },
      resetCProducts (state) {
        state.cProducts = []
      },
      pushCProducts (state, cProducts) {
        const newProducts = Object.assign({}, state.cProducts)
        for (const pid in cProducts) {
          newProducts[pid] = cProducts[pid]
        }
        state.cProducts = newProducts
      }
    }

    this.actions = {
      resetCProducts ({ commit, state, rootGetters }) {
        console.log('  XDC BRAND ACT reset Cbrand ')
        dXdpProduct.forEach((f) => { f() })
        dXdpProduct = []
        commit('resetCProducts')
      },
      setCProducts ({ commit, state, rootGetters }, sid) {
        console.log('  XDC SHOP Set CPRODUCTS ' + sid)
        if (state.cShop === null) {
          return 0
        } else if (state.cShop.id !== sid) {
          return 0
        } else if (state.cProducts.length !== 0) {
          // 既に設定済み場合は何もしない
          console.log('  XDC SHOP Set CPRODUCTS ARLADY NTD ' + sid)
          return 0
        }
        for (const bid in state.cShop.brands) {
          const plistRef = rootGetters['xf/xfbrands/refBrandProducts'](bid)
          dXdpProduct.push(plistRef.withConverter(cfBrands.ConvCProduct).onSnapshot((snap) => {
            const plist = {}
            if (!snap.empty) {
              console.log('  XDC SHOP SNP Set CPRODUCTS ' + bid)
              snap.forEach((docs) => {
                plist[docs.data().id] = docs.data()
              })
            }
            commit('pushCProducts', plist)
            this.dispatch(`${state.sPath}/setProductsCreatives`, plist, { root: true })
            // this.dispatch('xd/permit/xdpcreativeview/setProductsCreatives', plist, { root: true })
          }))
        }
        // TODO プロダクトショップを作るタイミングでここに追記
        //
        // ////
      }
    }

    this.getters = {
      cProducts: (state, getters, rootState, rootGetters) => {
        return state.cProducts
      }
    }
  }
}
