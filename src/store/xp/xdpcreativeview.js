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
      setBrandCreatives ({ commit, state, rootGetters }, cRef) {
        const cIds = []
        for (const cid in cRef) {
          if (typeof state.cCreatives[cid] !== 'undefined') {
            // already
          } else if (cIds.includes(cid)) {
            // already
          } else {
            cIds.push(cid)
          }
        }
        this.dispatch(`${state.sPath}/setCreativesByIds`, cIds, { root: true })
      },
      setProductsCreatives ({ commit, state, rootGetters }, plist) {
        console.log('  XDC SHOP Set CPRODUCTS CREATIVE ')
        const cIds = []
        for (const pid in plist) {
          for (const cid in plist[pid].creatives) {
            if (typeof state.cCreatives[cid] !== 'undefined') {
              // already
            } else if (cIds.includes(cid)) {
              // already
            } else {
              cIds.push(cid)
            }
          }
        }
        this.dispatch(`${state.sPath}/setCreativesByIds`, cIds, { root: true })
      },
      setCreativesByIds ({ commit, state, rootGetters }, cIds) {
        while (cIds.length > 0) {
          const cIds10 = cIds.slice(0, 10)
          const cIds10Ref = rootGetters['xf/xfcreatives/refCreativesByIds10'](cIds10)
          dXdpCreative.push(cIds10Ref.withConverter(cfCreatives.ConvCCreative).onSnapshot((snaps) => {
            snaps.forEach((snap) => {
              // console.log('  XDC SHOP Set CREATIVE ' + snap.data().id)
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
      cCrePath: (state, getters, rootState, rootGetters) => (cid) => {
        if (state.cCreatives === {}) {
          return pathLocading
        } else if (typeof state.cCreatives[cid] === 'undefined') {
          return pathLocading
        }
        return state.cCreatives[cid].url
      },
      cProTopCid: (state, getters, rootState, rootGetters) => (pid) => {
        return state.cProducts[pid].topimage
      },
      cProHasTopCre: (state, getters, rootState, rootGetters) => (pid) => {
        /*
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
        */
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
    }
  }
}
