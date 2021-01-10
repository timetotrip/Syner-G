const cfBrands = require('~/classes/cfBrands.js')
let dXdcCProducts = []

export const state = () => ({
  pList: {}
})

export const mutations = {
  setPList (state, plist) {
    state.pList = plist
  },
  addPList (state, product) {
    state.pList[product.id] = product
  }
}

export const actions = {
  addProduct ({ commit, state, rootGetters }, pname) {
    console.log('  XDC BRAND ACT Add product ' + pname)
    // クラス生成と初期化
    const product = new cfBrands.CProduct(pname)
    // ID発番
    product.id = Math.random().toString(32).substring(2)
    // クリエイターとブランドのID紐づけ
    product.creater = rootGetters['xd/general/xdgcuser/cUserId']
    product.brand = rootGetters['xd/create/xdcbrand/cBrandId']
    // 日時設定
    product.dateCreate = new Date()
    product.dateUpdate = new Date()
    // 表示用データ追加
    // commit('addPList', product)
    // Firestore追加
    this.dispatch('xf/xfbrands/addProduct', product, { root: true })
    // 選択状態の変更
    // commit('setCProductId', product.id)
  },
  updateProduct ({ commit, state, rootGetters }, pAfter) {
    console.log('  XDC BRAND ACT update product ' + pAfter.name)
    const pid = pAfter.id
    const pBefor = state.pList[pid]
    const fileTask = []
    // 日時設定
    pAfter.dateUpdate = new Date()
    for (const cid in pBefor.creatives) {
      if (typeof pAfter.creatives[cid] === 'undefined') {
        // todo storage 削除処理
      }
    }
    for (const cid in pAfter.creatives) {
      if (pAfter.creatives[cid].type === 'FILE') {
        fileTask.push(pAfter.creatives[cid])
        delete pAfter.creatives[cid]
      }
    }
    this.dispatch('xd/create/xdcproducts/updateProductCore', { pAfter, fileTask }, { root: true })
  },
  updateProductCore ({ commit, state, rootGetters }, { pAfter, fileTask }) {
    console.log('  XDC BRAND ACT update product core file = ' + fileTask.length)
    if (fileTask.length > 0) {
      // const cid = Math.random().toString(32).substring(2)
      const cid = fileTask[0].id
      const cRef = rootGetters['xf/xfstorage/refProductCreative'](pAfter.brand, pAfter.id, cid)
      const uTask = cRef.put(fileTask[0].file)
      uTask.on('state_changed',
        (snapshot) => { /* Progress */ },
        (err) => { console.log(err) },
        () => {
          uTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log('  XDC BRAND SNP update product core file upload')
            console.log(url)
            pAfter.creatives[cid] = fileTask[0].setUploadUrl(url)
            fileTask.shift()
            this.dispatch('xd/create/xdcproducts/updateProductCore', { pAfter, fileTask }, { root: true })
          })
        }
      )
    } else {
      this.dispatch('xf/xfbrands/updateProduct', pAfter, { root: true })
    }
  },
  setPList ({ commit, state, rootGetters }, bid) {
    console.log('  XDC BRAND ACT Set PLIST ' + bid)
    const plistRef = rootGetters['xf/xfbrands/refBrandProducts'](bid)
    dXdcCProducts.push(plistRef.withConverter(cfBrands.ConvCProduct).onSnapshot((snap) => {
      const plist = {}
      if (!snap.empty) {
        console.log('  XDC BRAND SNP Set PLIST ' + bid)
        snap.forEach((docs) => {
          plist[docs.data().id] = docs.data()
        })
      }
      commit('setPList', plist)
    }))
  },
  resetPList ({ commit, state, rootGetters }) {
    console.log('  XDC BRAND ACT Reset PLIST ')
    dXdcCProducts.forEach((f) => { f() })
    dXdcCProducts = []
    commit('setPList', {})
  }
}

export const getters = {
  pList: (state, getters, rootState, rootGetters) => {
    return state.pList
  }
}
