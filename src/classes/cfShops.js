'use strict'

class CShop {
  constructor (id, name, owner) {
    this.name = name
    this.owner = owner
    this.id = id
    this.logo = ''
    this.brands = {}
    this.products = {}
    this.sells = {}
    this.staffs = {}
    this.front = {}
  }
}

const ConvCShop = {
  toFirestore (shop) {
    const frontObj = {}
    for (const fid in shop.front) {
      frontObj[fid] = shop.front[fid].toObj()
    }
    return {
      name: shop.name,
      owner: shop.owner,
      logo: shop.logo,
      brands: shop.brands,
      products: shop.products,
      sells: shop.sells,
      staffs: shop.staffs,
      front: frontObj
    }
  },
  fromFirestore (snapshot, options) {
    const frontClass = {}
    const data = snapshot.data(options)
    const id = snapshot.id
    const shop = new CShop(id, data.name, data.owner)
    shop.logo = data.logo
    shop.brands = Object.assign({}, data.brands)
    shop.products = Object.assign({}, data.products)
    shop.sells = Object.assign({}, data.sells)
    shop.staffs = Object.assign({}, data.staffs)
    for (const fid in data.front) {
      frontClass[fid] = (new CsFront('', 0)).fromObj(data.front[fid])
    }
    shop.front = frontClass
    return shop
  }
}

class CsFront {
  constructor (type, order) {
    this.type = type
    this.order = order
    this.creatives = {}
  }

  toObj () {
    const ret = {}
    ret.type = this.type
    ret.order = this.order
    ret.creatives = Object.assign({}, this.creatives)
    return ret
  }

  fromObj (obj) {
    this.type = obj.type
    this.order = obj.order
    this.creatives = Object.assign({}, obj.creatives)
    return this
  }
}

exports.CShop = CShop
exports.ConvCShop = ConvCShop
