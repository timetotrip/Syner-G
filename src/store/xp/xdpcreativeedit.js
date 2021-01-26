import CreativeView from '~/store/xp/xdpcreativeview.js'
const cfCreatives = require('~/classes/cfCreatives.js')
const creativeView = new CreativeView()

export default class {
  constructor () {
    this.state = {
      ...creativeView.state
    }

    this.mutations = {
      ...creativeView.mutations
    }

    this.actions = {
      ...creativeView.actions,
      updateProductCreative ({ commit, state, rootGetters }, fileTask) {
        console.log('  XDC BRAND ACT update product creative = ' + fileTask.length)
        for (const cid in fileTask) {
          const cRef = rootGetters['xf/xfstorage/refCreativeById'](cid)
          const uTask = cRef.put(fileTask[cid])
          uTask.on('state_changed',
            (snapshot) => { /* Progress */ },
            (err) => { console.log(err) },
            () => {
              uTask.snapshot.ref.getDownloadURL().then((url) => {
                console.log('  XDC BRAND SNP update product core file upload')
                console.log(url)
                const cobj = new cfCreatives.CCreative()
                cobj.setIdUrl(cid, url)
                this.dispatch('xf/xfcreatives/addCreative', cobj, { root: true })
                commit('pushCCreative', cobj)
              })
            }
          )
        }
      }
    }

    this.getters = {
      ...creativeView.getters,
      getCRefUrls: (state, getters, rootState, rootGetters) => (cRefs) => {
        const ret = {}
        for (const cid in cRefs) {
          if (cRefs[cid].type === 'FILE') {
            ret[cid] = window.URL.createObjectURL(cRefs[cid].file)
          } else if (cRefs[cid].type === 'URL') {
            ret[cid] = cRefs[cid].url
          } else if (cRefs[cid].type === 'REF') {
            ret[cid] = rootGetters[`${state.sPath}/cCrePath`](cid)
          }
        }
        return ret
      }
    }
  }
}
