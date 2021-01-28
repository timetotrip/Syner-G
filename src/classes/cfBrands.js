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
    // this.creatives = {}
    this.creativeIds = []
  }

  isEqualCreativeIds (cIds) {
    return this.creativeIds.toString() === cIds.toString()
  }
}

const ConvCBrand = {
  toFirestore (brand) {
    return {
      name: brand.name,
      owner: brand.owner,
      shop: brand.shop.toString(),
      logo: brand.logo,
      sells: brand.sells,
      staffs: brand.staffs,
      creativeIds: brand.creativeIds.slice()
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
    brand.creativeIds = data.creativeIds.slice()
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
    this.creativeIds = []
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

  isEqualCreativeIds (cIds) {
    return this.creativeIds.toString() === cIds.toString()
  }
}
const ConvCProduct = {
  toFirestore (product) {
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
      creativeIds: product.creativeIds.slice()
    }
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    const id = snapshot.id
    const product = new CProduct(data.name)
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
    product.creativeIds = data.creativeIds.slice()
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
  }

  toObj () {
    const ret = {}
    ret.id = this.id
    ret.title = this.title
    ret.type = this.type
    ret.file = this.file
    ret.url = this.url
    return ret
  }

  fromObj (obj) {
    this.id = obj.id
    this.title = obj.title
    this.type = obj.type
    this.file = obj.file
    this.url = obj.url
    return this
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
exports.CBrand = CBrand
exports.CProduct = CProduct
exports.CCreativeRef = CCreativeRef
exports.ConvCBrand = ConvCBrand
exports.ConvCProduct = ConvCProduct
// exports.ConvCProduct = ConvCCreative
