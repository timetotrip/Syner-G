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
    this.front = []
  }
}

const ConvCShop = {
  toFirestore (shop) {
    return {
      name: shop.name,
      owner: shop.owner,
      logo: shop.logo,
      brands: shop.brands,
      products: shop.products,
      sells: shop.sells,
      staffs: shop.staffs,
      front: shop.front.map((f) => { return f.toObj() })
    }
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    const id = snapshot.id
    const shop = new CShop(id, data.name, data.owner)
    shop.logo = data.logo
    shop.brands = Object.assign({}, data.brands)
    shop.products = Object.assign({}, data.products)
    shop.sells = Object.assign({}, data.sells)
    shop.staffs = Object.assign({}, data.staffs)
    shop.front = data.front.map((f) => {
      return (new CsFront(f.type)).fromObj(f)
    })
    return shop
  }
}

class CsFront {
  constructor (type) {
    this.type = type
    this.creativeIds = []
  }

  toObj () {
    const ret = {}
    ret.type = this.type
    ret.creativeIds = this.creativeIds.slice()
    return ret
  }

  fromObj (obj) {
    this.type = obj.type
    this.creativeIds = obj.creativeIds.slice()
    return this
  }

  setCreativeIds (crs) {
    this.creativeIds = crs.creativeIds.slice()
  }

  pushCreativeId (cid) {
    this.creativeIds.push(cid)
  }
}

exports.CShop = CShop
exports.ConvCShop = ConvCShop
