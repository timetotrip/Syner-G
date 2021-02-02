export const state = () => ({
  nPanel: 0,
  nElem: 0,
  nBit: 0,
  npMax: 0,
  neMax: 0,
  nbMax: 0,
  neMap: {}
})

export const mutations = {
  nPanel (state, { p, e }) {
    state.nPanel = p
    state.nElem = e
  },
  nPMax (state, m) {
    state.npMax = m
  },
  nEMax (state, m) {
    state.neMax = m
  },
  nEMaxAdd (state, em) {
    state.neMax = state.neMax + 1
    state.neMap[em] = state.neMax
  },
  startPanel (state) {
    state.nPanel = 0
    state.nElem = 0
  },
  resetPanel (state) {
    state.nPanel = -1
    state.nElem = -1
  },
  resetNebMax (state) {
    state.neMax = 0
    state.nbMax = 0
    state.neMap = {}
  }
}

export const actions = {
  /*
    スライドを指定
  */
  nPanelSet ({ commit, state, rootGetters }, num) {
    // console.log('  XD NSLID SET ' + num)
    commit('nPanel', { p: num, e: 0 })
  },
  nPanelReset ({ commit, state, rootGetters }, num) {
    console.log('  XD NSLID SET ' + num)
    commit('resetPanel')
  },
  nPanelStart ({ commit, state, rootGetters }, num) {
    console.log('  XD NSLID Start ' + num)
    commit('startPanel')
  },
  goPrevOnce ({ commit, state, rootGetters }) {
    // console.log('  XD NSLID goPrevOnce ')
    const nextPnl = state.nPanel - 1
    if (nextPnl >= 0) {
      commit('resetNebMax')
      commit('nPanel', { p: nextPnl, e: 999 })
    }
  },
  goPrevStep ({ commit, state, rootGetters }) {
    // console.log('  XD NSLID goPrevStep ')
    const nextEle = state.nElem - 1
    if (nextEle < 0) {
      const nextPnl = state.nPanel - 1
      if (nextPnl >= 0) {
        commit('resetNebMax')
        commit('nPanel', { p: nextPnl, e: 0 })
      }
    } else {
      commit('nPanel', { p: state.nPanel, e: nextEle })
    }
    // console.log(`${state.nPanel}/${state.npMax}  ${state.nElem}/${state.neMax} ${state.nBit}/${state.nbMax}`)
  },
  goNextStep ({ commit, state, rootGetters }) {
    console.log('  XD NSLID goNextStep ')
    const nextEle = state.nElem + 1
    if (nextEle > state.neMax) {
      const nextPnl = state.nPanel + 1
      if (nextPnl < state.npMax) {
        commit('nPanel', { p: nextPnl, e: 0 })
        commit('resetNebMax')
      }
    } else {
      commit('nPanel', { p: state.nPanel, e: nextEle })
    }
    // console.log(`${state.nPanel}/${state.npMax}  ${state.nElem}/${state.neMax} ${state.nBit}/${state.nbMax}`)
  },
  goNextOnce ({ commit, state, rootGetters }) {
    // console.log('  XD NSLID goNextOnce ')
    //
  },
  addPMax ({ commit, state, rootGetters }) {
    // console.log('  XD NSLID add PMax ')
    //
    commit('nPMax', state.npMax + 1)
    // console.log(`${state.nPanel}/${state.npMax}  ${state.nElem}/${state.neMax} ${state.nBit}/${state.nbMax}`)
  },
  addEMax ({ commit, state, rootGetters }) {
    // console.log('  XD NSLID add EMax ')
    commit('nEMax', state.neMax + 1)
    // console.log(`${state.nPanel}/${state.npMax}  ${state.nElem}/${state.neMax} ${state.nBit}/${state.nbMax}`)
  },
  addEMaxNum ({ commit, state, rootGetters }, em) {
    // console.log('  XD NSLID add EMax NUM ' + em)
    if (em === 0) {
      //
    } else if (state.neMap[em]) {
      //
    } else {
      commit('nEMaxAdd', em)
    }
    // console.log(`${state.nPanel}/${state.npMax}  ${state.nElem}/${state.neMax} ${state.nBit}/${state.nbMax}`)
  }
}

export const getters = {
  /*
  nPanel: (state, getters, rootState, rootGetters) => {
    return state.nSlide
  },
  */
  nPanel: (state, getters, rootState, rootGetters) => {
    return state.nPanel
  },
  nElem: (state, getters, rootState, rootGetters) => {
    // console.log('nElem ' + state.nElem)
    return state.nElem
  }
}
