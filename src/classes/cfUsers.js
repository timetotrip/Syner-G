'use strict'

class CUser {
  constructor (id, name) {
    this.id = id
    this.name = name
    // this.ownBrands = ownBrands
    this.permitBrands = {}
    this.permitShops = {}
  }
}

const ConvCUser = {
  toFirestore (user) {
    return {
      id: user.id,
      name: user.name,
      permitBrands: user.permitBrands,
      permitShops: user.permitShops
    }
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    const user = CUser(data.id, data.name)
    user.permitBrands = Object.assign({}, data.permitBrands)
    user.permitShops = Object.assign({}, data.permitShops)
    return user
  }
}

exports.CUser = CUser
exports.ConvCUser = ConvCUser
