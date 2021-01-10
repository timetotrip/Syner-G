'use strict'

class CBrand {
  constructor (id, name, owner) {
    this.name = name
    this.owner = owner
    this.id = id
    this.logo = ''
    this.shop = {}
    this.sells = {}
    this.staffs = {}
    /*
    this.setLogo = function (l) {
      this.logo = l
    }
    this.setShop = function (s) {
      this.shop = s
    }
    this.setSells = function (s) {
      this.sells = s
    }
    this.setStaffs = function (s) {
      this.staffs = s
    }
    */
  }
}

const ConvCBrand = {
  toFirestore (brand) {
    return {
      name: brand.name,
      owner: brand.owner,
      shop: brand.shop,
      logo: brand.logo,
      sells: brand.sells,
      staffs: brand.staffs
    }
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    const id = snapshot.id
    const brand = new CBrand(id, data.name, data.owner)
    brand.logo = data.logo
    brand.shop = data.shop
    brand.sells = data.sells
    brand.staffs = data.staffs
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
      creatives: product.creatives
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
    product.creatives = Object.assign({}, data.creatives)
    return product
  }
}

exports.CBrand = CBrand
exports.CProduct = CProduct
exports.ConvCBrand = ConvCBrand
exports.ConvCProduct = ConvCProduct
