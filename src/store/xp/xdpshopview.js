const cfShops = require('~/classes/cfShops.js')
let dXdpShop = []
export default class {
  constructor () {
    this.state = {
      cShop: null
    }

    this.mutations = {
      setCShop (state, cShop) {
        state.cShop = cShop
      }
    }

    this.actions = {
      /*
        カレントSHOPの設定
      */
      setCShop ({ commit, state, rootGetters }, sid) {
        console.log('  XDC SHOP Set CSHOP ' + sid)
        if (state.cShop != null) {
          // 既に設定済み場合は何もしない
          if (state.cShop.id === sid) {
            console.log('  XDC SHOP Set CSHOP ARLADY NTD ' + sid)
            return 0
          }
        }
        // ショップ 参照の取得
        const cShopRef = rootGetters['xf/xfshops/refShopById'](sid)
        // イベントハンドラの設定
        dXdpShop.push(cShopRef.withConverter(cfShops.ConvCShop).onSnapshot((snap) => {
          if (!snap.empty) {
            console.log('  XDC SHOP Set CSHOP SET' + sid)
            commit('setCShop', snap.data())
          } else {
            console.log('  XDC SHOP Set CSHOP ERROR CANT FIND' + sid)
          }
        }))
      },
      /*
        カレントSHOPのリセット
      */
      resetCShop ({ commit, state, rootGetters }) {
        console.log('  XDC BRAND ACT reset Cbrand ')
        dXdpShop.forEach((f) => { f() })
        dXdpShop = []
        this.dispatch(`${this.sPath}/resetCProducts`, { root: true })
        this.dispatch(`${this.sPath}/resetCCreatives`, { root: true })
      }
    }

    this.getters = {
      cShop: (state, getters, rootState, rootGetters) => {
        if (!process.browser) {
          return null
        } else {
          return state.cShop
        }
      },
      cShopName: (state, getters, rootState, rootGetters) => {
        console.log('  XDC BRAND ACT cShopName ')
        if (!process.browser) {
          return ''
        } else if (state.cShop === null) {
          return ''
        } else {
          return state.cShop.name
        }
      }
    }
  }
}
