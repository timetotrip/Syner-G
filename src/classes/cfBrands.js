'use strict'

class CBrand {
  constructor (id, name, owner) {
    this.name = name
    this.owner = owner
    this.id = id
    this.logo = ''
    this.shop = ''
    this.sells = {}
    this.staffs = {}
    // クリエイティブ 連想配列
    this.creatives = {}
  }

  isEqualCreatives (ctv) {
    for (const key in this.creatives) {
      if (typeof ctv[key] === 'undefined') {
        return false
      } else if (ctv[key] !== this.creatives[key]) {
        return false
      }
    }
    for (const key in ctv) {
      if (typeof this.creatives[key] === 'undefined') {
        return false
      } else if (ctv[key] !== this.creatives[key]) {
        return false
      }
    }
    return true
  }
}

const ConvCBrand = {
  toFirestore (brand) {
    const creativesObj = {}
    for (const cid in brand.creatives) {
      creativesObj[cid] = brand.creatives[cid].toObj()
    }
    return {
      name: brand.name,
      owner: brand.owner,
      shop: brand.shop.toString(),
      logo: brand.logo,
      sells: brand.sells,
      staffs: brand.staffs,
      creatives: creativesObj
    }
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    const id = snapshot.id
    const brand = new CBrand(id, data.name, data.owner)
    brand.logo = data.logo
    brand.shop = data.shop.toString()
    brand.sells = Object.assign({}, data.sells)
    brand.staffs = Object.assign({}, data.staffs)
    const creativesClass = {}
    for (const cid in data.creatives) {
      creativesClass[cid] = (new CCreativeRef()).fromObj(data.creatives[cid])
    }
    brand.creatives = creativesClass
    return brand
  }
}
class CProduct {
  constructor (name) {
    // 商品名
    this.name = name
    // id
    this.id = ''
    // 値段
    this.price = 0
    // ステータス draft → onsale → endofsale
    this.status = 'draft'
    // タイプ
    this.type = ''
    // トップ画像 クリエイティブID
    this.topimage = ''
    // クリエイター ユーザーID
    this.creater = ''
    // 作成日
    this.dateCreate = ''
    // 更新日
    this.dateUpdate = ''
    // 発売日
    this.dateRelease = ''
    // 販売終了日
    this.dateEnd = ''
    // 所属ブランド ID
    this.brand = ''
    // 注目度 オブジェクト
    this.attention = {}
    // 仕入れ 連想配列
    this.purchase = {}
    // クリエイティブ 連想配列
    this.creatives = {}
  }

  isEqualAttention (atn) {
    for (const key in this.attention) {
      if (typeof atn[key] === 'undefined') {
        return false
      } else if (atn[key] !== this.attention[key]) {
        return false
      }
    }
    for (const key in atn) {
      if (typeof this.attention[key] === 'undefined') {
        return false
      } else if (atn[key] !== this.attention[key]) {
        return false
      }
    }
    return true
  }

  isEqualPurchase (pch) {
    for (const key in this.purchase) {
      if (typeof pch[key] === 'undefined') {
        return false
      } else if (pch[key] !== this.purchase[key]) {
        return false
      }
    }
    for (const key in pch) {
      if (typeof this.purchase[key] === 'undefined') {
        return false
      } else if (pch[key] !== this.purchase[key]) {
        return false
      }
    }
    return true
  }

  isEqualCreatives (ctv) {
    for (const key in this.creatives) {
      if (typeof ctv[key] === 'undefined') {
        return false
      } else if (ctv[key] !== this.creatives[key]) {
        return false
      }
    }
    for (const key in ctv) {
      if (typeof this.creatives[key] === 'undefined') {
        return false
      } else if (ctv[key] !== this.creatives[key]) {
        return false
      }
    }
    return true
  }
}
const ConvCProduct = {
  toFirestore (product) {
    const creativesObj = {}
    for (const cid in product.creatives) {
      creativesObj[cid] = product.creatives[cid].toObj()
    }
    return {
      name: product.name,
      price: product.price,
      type: product.type,
      status: product.status,
      topimage: product.topimage,
      creater: product.creater,
      dateCreate: product.dateCreate,
      dateUpdate: product.dateUpdate,
      dateRelease: product.dateRelease,
      dateEnd: product.dateEnd,
      brand: product.brand,
      attention: product.attention,
      purchase: product.purchase,
      creatives: creativesObj
    }
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    const id = snapshot.id
    const product = new CProduct(data.name)
    const creativesClass = {}
    product.id = id
    product.price = data.price
    product.status = data.status
    product.type = data.type
    product.topimage = data.topimage
    product.creater = data.creater
    product.dateCreate = data.dateCreate
    product.dateUpdate = data.dateUpdate
    product.dateRelease = data.dateRelease
    product.dateEnd = data.dateEnd
    product.brand = data.brand
    product.attention = Object.assign({}, data.attention)
    product.purchase = Object.assign({}, data.purchase)
    for (const cid in data.creatives) {
      creativesClass[cid] = (new CCreativeRef()).fromObj(data.creatives[cid])
    }
    product.creatives = creativesClass
    return product
  }
}

class CCreativeRef {
  constructor () {
    this.id = ''
    this.title = ''
    this.type = ''
    this.file = null
    this.url = ''
    /*
    this.synergy = {}
    this.pv = 0
    this.like = 0
    this.dateCreate = ''
    this.dateUpdate = ''
    */
  }

  toObj () {
    const ret = {}
    ret.id = this.id
    ret.title = this.title
    ret.type = this.type
    ret.file = this.file
    ret.url = this.url
    /*
    ret.synergy = this.synergy
    ret.pv = this.pv
    ret.like = this.like
    ret.dateCreate = this.dateCreate
    ret.dateUpdate = this.dateUpdate
    */
    return ret
  }

  fromObj (obj) {
    this.id = obj.id
    this.title = obj.title
    this.type = obj.type
    this.file = obj.file
    this.url = obj.url
    return this
    /*
    this.synergy = obj.synergy
    this.pv = obj.pv
    this.like = obj.like
    this.dateCreate = obj.dateCreate
    this.dateUpdate = obj.dateUpdate
    */
  }

  setFromFile (file, code) {
    this.type = 'FILE'
    this.id = `${code}-${Math.random().toString(32).substring(4)}`
    this.file = file
    this.dateCreate = new Date()
    return this
  }

  uploadingRef () {
    this.type = 'REF'
    this.file = null
  }

  setUploadUrl (url) {
    this.type = 'URL'
    this.url = url
    this.file = null
    return this
  }

  getPath () {
    if (this.type === 'FILE') {
      return window.URL.createObjectURL(this.file)
    } else if (this.type === 'URL') {
      return this.url
    }
    return ''
  }
}
/*
const ConvCCreative = {
  toFirestore (product) {
    return {
    }
  },
  fromFirestore (snapshot, options) {
  }
}
*/
exports.CBrand = CBrand
exports.CProduct = CProduct
exports.CCreativeRef = CCreativeRef
exports.ConvCBrand = ConvCBrand
exports.ConvCProduct = ConvCProduct
// exports.ConvCProduct = ConvCCreative
