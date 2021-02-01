'use strict'

class CShop {
  constructor (id, name, owner) {
    this.name = name
    this.owner = owner
    this.id = id
    this.logo = ''
    this.brand = ''
    this.products = {}
    this.sells = {}
    this.staffs = {}
    this.front = []
  }

  cIds () {
    const ret = []
    this.front.forEach((sf)=>{
      sf.cIds().forEach((cid)=>{
        if (!ret.includes(cid)) {
          ret.push(cid)
        }
      })
    })
    return ret
  }
}

const ConvCShop = {
  toFirestore (shop) {
    return {
      name: shop.name,
      owner: shop.owner,
      logo: shop.logo,
      brand: shop.brand,
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
    shop.brand = data.brand
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
    this.creativeMaps = []
  }

  toObj () {
    const ret = {}
    ret.type = this.type
    ret.creativeIds = this.creativeIds.slice()
    ret.creativeMaps = Object.assign({}, this.creativeMaps)
    return ret
  }

  fromObj (obj) {
    this.type = obj.type
    this.creativeIds = obj.creativeIds.slice()
    this.creativeMaps = Object.assign({}, obj.creativeMaps)
    return this
  }

  setCreativeIds (crs) {
    this.creativeIds = crs.creativeIds.slice()
  }

  pushCreativeId (cid) {
    this.creativeIds.push(cid)
  }

  cIds () {
    const ret = this.creativeIds.slice()
    for (const cid in this.creativeMaps) {
      if (!ret.includes(cid)) {
        ret.push(cid)
      }
    }
    return ret
  }
}

exports.CShop = CShop
exports.CsFront = CsFront
exports.ConvCShop = ConvCShop
