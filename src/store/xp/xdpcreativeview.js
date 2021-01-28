// const cfShops = require('~/classes/cfShops.js')
// const cfBrands = require('~/classes/cfBrands.js')
const cfCreatives = require('~/classes/cfCreatives.js')
const pathLocading = ''
let dXdpCreative = []
export default class {
  constructor () {
    this.state = {
      cCreatives: {}
    }

    this.mutations = {
      pushCCreative (state, creative) {
        const newCreatives = Object.assign({}, state.cCreatives)
        newCreatives[creative.id] = creative
        state.cCreatives = newCreatives
      },
      resetCCreatives (state) {
        state.cCreatives = {}
      }
    }

    this.actions = {
      setProductsCreatives ({ commit, state, rootGetters }, plist) {
        console.log('  XDC SHOP Set setProductsCreatives ')
        const cIds = []
        for (const pid in plist) {
          plist[pid].creativeIds.forEach((cid) => {
            if (!cIds.includes(cid)) {
              cIds.push(cid)
            }
          })
        }
        this.dispatch(`${state.sPath}/setCreativesByIds`, cIds, { root: true })
      },
      setCreativesByIds ({ commit, state, rootGetters }, cIds) {
        console.log('  XDC SHOP Set setCreativesByIds ')
        while (cIds.length > 0) {
          const cIds10 = cIds.slice(0, 10)
          const cIds10Ref = rootGetters['xf/xfcreatives/refCreativesByIds10'](cIds10)
          dXdpCreative.push(cIds10Ref.withConverter(cfCreatives.ConvCCreative).onSnapshot((snaps) => {
            snaps.forEach((snap) => {
              commit('pushCCreative', snap.data())
            })
          }))
          cIds = cIds.slice(10)
        }
      },
      resetCCreatives ({ commit, state, rootGetters }) {
        dXdpCreative.forEach((f) => { f() })
        dXdpCreative = []
        commit('resetCCreatives')
      }
    }

    this.getters = {
      cCrePath: (state, getters, rootState, rootGetters) => (cid) => {
        if (state.cCreatives === {}) {
          return pathLocading
        } else if (typeof state.cCreatives[cid] === 'undefined') {
          return pathLocading
        }
        return state.cCreatives[cid].url
      }
      /*
      cProCreatives: (state, getters, rootState, rootGetters) => (pid) => {
        if (typeof state.cProducts[pid] === 'undefined') {
          return {}
        }
        return state.cProducts[pid].creatives
      },
      cProCreativeIds: (state, getters, rootState, rootGetters) => (pid) => {
        const creatives = rootGetters[`${state.sPath}/cProCreatives`](pid)
        if (creatives === {}) {
          return []
        }
        return Object.keys(creatives)
      },
      cProTopCid: (state, getters, rootState, rootGetters) => (pid) => {
        return state.cProducts[pid].topimage
      },
      cProHasTopCre: (state, getters, rootState, rootGetters) => (pid) => {
        if (typeof state.cProducts[pid] === 'undefined') {
          return false
        } else if (state.cProducts[pid].topimage !== '') {
          return true
        }
        const pCreativeIds = rootGetters['xd/permit/xdpshopview/cProCreativeIds'](pid)
        if (pCreativeIds.length > 0) {
          return true
        }
        return false
      },
      cProTopCrePath: (state, getters, rootState, rootGetters) => (pid) => {
        if (typeof state.cProducts[pid] === 'undefined') {
          return ''
        } else if (state.cProducts[pid].topimage !== '') {
          return state.cProducts[pid].topimage
        }
        const pCreativeIds = rootGetters[`${state.sPath}/cProCreativeIds`](pid)
        if (pCreativeIds.length > 0) {
          return rootGetters[`${state.sPath}/cCrePath`](pCreativeIds[0])
        }
        return pathLocading
      }
      */
    }
  }
}
