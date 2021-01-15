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
  }
}

const ConvCShop = {
  toFirestore (shop) {
    // console.log(shop)
    return {
      name: shop.name,
      owner: shop.owner,
      logo: shop.logo,
      brands: shop.brands,
      products: shop.products,
      sells: shop.sells,
      staffs: shop.staffs
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
    return shop
  }
}
exports.CShop = CShop
exports.ConvCShop = ConvCShop
