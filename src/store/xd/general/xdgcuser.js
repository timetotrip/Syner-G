// import firebase from 'firebase'
const cfUsers = require('~/classes/cfUsers.js')
// const { firebase } = require('~/plugins/firebase.js')
let dXdcCUser = []

export const state = () => ({
  cUser: null
})

export const mutations = {
  setCuser (state, user) {
    console.log('  XDG CUSER MUT setCuser')
    state.cUser = user
  }
}

export const actions = {
  /*
    強制ログイン
    - ログイン状態のチェック→ログイン処理
  */
  forceLogin ({ commit, state, rootGetters }) {
    console.log('  XDG CUSER ACT forceLogin')
    let cUserId = ''
    // SSRチェック
    if (!process.browser) {
      return 0
    }
    // ログイン強制
    if (state.cUser === null) {
      // テスト用ログイン
      cUserId = 'S8zgWLvwz5HEUtpMAKnj'
      console.log('  XDG CUSER ACT forceLogin - Test User ' + cUserId)
      actions.refCUser({ commit, state, rootGetters }, cUserId)
    } else {
      console.log('  XDG CUSER ACT forceLogin - ALREADY LOGIN ' + state.cUser.name)
    }
  },
  /*
    ログインユーザー データ同期設定
  */
  refCUser ({ commit, state, rootGetters }, uid) {
    console.log('  XDG CUSER ACT cUser refCUser')
    // 過去の設定をリセット
    dXdcCUser.forEach((f) => { f() })
    dXdcCUser = []
    // ログインユーザー 参照の取得
    const cUserRef = rootGetters['xf/xfusers/refCUser'](uid)
    // イベントハンドラの設定
    dXdcCUser.push(cUserRef.withConverter(cfUsers.ConvCUser).onSnapshot((snap) => {
      if (!snap.empty) {
        console.log('  XDG CUSER ACT cUser refCUser UPDATE -- Set ' + snap.data().name)
        commit('setCuser', snap.data())
      } else {
        console.log('  XDG CUSER ACT cUser refCUser UPDATE -- ERROR')
      }
    }))
  },
  /*
    ログインユーザー データ同期設定の解除（内部）
  */
  resetRefCUser ({ commit, state, rootGetters }) {
    console.log('  XDG CUSER ACT cUser resetRefCUser')
    dXdcCUser.forEach((f) => { f() })
    dXdcCUser = []
  },
  /*
    ログアウト
  */
  logOut ({ commit, state, rootGetters }) {
    console.log('  XDG CUSER ACT cUser logOut')
    actions.resetRefCUser({ commit, state, rootGetters })
    commit('sCurrentUser', null)
  },
  /*
    MngBrands追加
  */
  addMngBrand ({ commit, state, rootGetters }, bid) {
    console.log('  XDG CUSER ACT add mng brand ' + bid)
    if (state.cUser === null) {
      return 0
    }
    const cUserRef = rootGetters['xf/xfusers/refCUser'](state.cUser.id)
    cUserRef.update({
      ['permitBrands.' + bid]: 'MNG'
    })
  },
  /*
    MngShops追加
  */
  addMngShop ({ commit, state, rootGetters }, sid) {
    console.log('  XDG CUSER ACT add mng shop ' + sid)
    if (state.cUser === null) {
      return 0
    }
    const cUserRef = rootGetters['xf/xfusers/refCUser'](state.cUser.id)
    cUserRef.update({
      ['permitShops.' + sid]: 'MNG'
    })
  }
}
export const getters = {
  /*
    ログイン中ユーザーデータ
  */
  cUser: (state, getters, rootState, rootGetters) => {
    if (!process.browser) {
      return null
    }
    return state.cUser
  },
  /*
    ログイン中ユーザーID
  */
  cUserId: (state, getters, rootState, rootGetters) => {
    if (!process.browser) {
      return ''
    } else if (state.cUser === null) {
      return ''
    }
    return state.cUser.id
  },
  /*
    ブランドのパーミット返却
  */
  brandPermit: (state, getters, rootState, rootGetters) => (bid) => {
    if (!process.browser) {
      return ''
    } else if (state.cUser === null) {
      return ''
    } else if (typeof state.cUser.permitBrands === 'undefined') {
      return ''
    } else if (typeof state.cUser.permitBrands[bid] === 'undefined') {
      return ''
    }
    return state.cUser.permitBrands[bid]
  },
  /*
    ブランドのパーミットチェック
  */
  hasBrandPermit: (state, getters, rootState, rootGetters) => (bid, need) => {
    const pmt = rootGetters['xd/general/xdgcuser/brandPermit'](bid)
    return rootGetters['xd/general/xdgcuser/hasPermit'](need, pmt)
  },
  /*
    SHOPのパーミット返却
  */
  shopPermit: (state, getters, rootState, rootGetters) => (sid) => {
    console.log(sid)
    if (!process.browser) {
      return ''
    } else if (state.cUser === null) {
      return ''
    } else if (typeof state.cUser.permitShops[sid] === 'undefined') {
      return ''
    } else if (typeof state.cUser.permitShops[sid] === 'undefined') {
      return ''
    }
    return state.cUser.permitShops[sid]
  },
  /*
    ブランドのパーミットチェック
  */
  hasShopPermit: (state, getters, rootState, rootGetters) => (sid, need) => {
    const pmt = rootGetters['xd/general/xdgcuser/shopPermit'](sid)
    return rootGetters['xd/general/xdgcuser/hasPermit'](need, pmt)
  },
  hasPermit: (state, getters, rootState, rootGetters) => (need, pmt) => {
    switch (need) {
      case 'MNG':
        switch (pmt) {
          case 'MNG':
            return true
          default :
            return false
        }
      case 'EDT':
        switch (pmt) {
          case 'MNG':
          case 'EDT':
            return true
          default :
            return false
        }
      case 'VEW':
        /*
        switch (pmt) {
          case 'MNG':
          case 'EDT':
          case 'VEW':
            return true
          default :
            return false
        }
        */
        return true
      default :
        return false
    }
  },
  myBrands: (state, getters, rootState, rootGetters) => {
    console.log('  XDG CUSER GTR MyBrands')
    if (!process.browser) {
      return null
    } else if (state.cUser === null) {
      return null
    } else if (typeof state.cUser.permitBrands === 'undefined') {
      return null
    } else {
      const ret = {}
      for (const bid in state.cUser.permitBrands) {
        ret[bid] = '名前あとで'
      }
      return ret
    }
  },
  myShops: (state, getters, rootState, rootGetters) => {
    console.log('  XDG CUSER GTR myShops')
    if (!process.browser) {
      return null
    } else if (state.cUser === null) {
      return null
    } else if (typeof state.cUser.permitShops === 'undefined') {
      return null
    } else {
      const ret = {}
      for (const sid in state.cUser.permitShops) {
        ret[sid] = '名前あとで'
      }
      return ret
    }
  }
}
