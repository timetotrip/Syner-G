const cfBrands = require('~/classes/cfBrands.js')
let dXdpCBrand = []
export default class {
  constructor () {
    this.state = {
      cBrand: null,
      cBrandPermit: '' // MNG or EDT or VEW or NON
    }

    this.mutations = {
      setCbrand (state, { cBrand, permit }) {
        state.cBrand = cBrand
        state.cBrandPermit = permit
      }
    }

    this.actions = {
      /*
        カレントSHOPの設定
      */
      /*
        カレントブランドの設定
      */
      setCBrand ({ commit, state, rootGetters }, bid) {
        console.log('  XDC BRAND Set Cbrand ' + bid)
        if (!rootGetters['xd/general/xdgcuser/hasBrandPermit'](bid, 'VEW')) {
          // 権限チェック
          console.log('  XDC BRAND Set Cbrand NO Permit error ' + bid)
          return 0
        } else if (state.cBrand != null) {
          // 既に設定済み場合は何もしない
          if (state.cBrand.id === bid) {
            console.log('  XDC BRAND Set Cbrand ARLADY NTD ' + bid)
            return 0
          }
        }
        // 過去の設定をリセット
        dXdpCBrand.forEach((f) => { f() })
        dXdpCBrand = []
        // 現在の権限設定を取得
        const pmt = rootGetters['xd/general/xdgcuser/brandPermit'](bid)
        // ブランド 参照の取得
        const cBrandRef = rootGetters['xf/xfbrands/refBrandById'](bid)
        // イベントハンドラの設定
        dXdpCBrand.push(cBrandRef.withConverter(cfBrands.ConvCBrand).onSnapshot((snap) => {
          if (!snap.empty) {
            console.log('  XDC BRAND Set Cbrand SET' + bid)
            commit('setCbrand', { cBrand: snap.data(), permit: pmt })
            this.dispatch(`${state.sPath}/setBrandCreatives`, snap.data().creatives, { root: true })
          } else {
            console.log('  XDC BRAND Set Cbrand ERROR CANT FIND' + bid)
          }
        }))
      },
      /*
        カレントブランドのリセット
      */
      resetCBrand ({ commit, state, rootGetters }) {
        console.log('  XDC BRAND ACT reset Cbrand ')
        dXdpCBrand.forEach((f) => { f() })
        dXdpCBrand = []
      }
    }

    this.getters = {
      cBrand: (state, getters, rootState, rootGetters) => {
        return state.cBrand
      },
      cBrandId: (state, getters, rootState, rootGetters) => {
        if (state.cBrand === null) {
          return ''
        }
        return state.cBrand.id
      },
      cBrandPermit: (state, getters, rootState, rootGetters) => {
        return state.cBrandPermit
      }
    }
  }
}
