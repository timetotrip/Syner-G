'use strict'

class CUser {
  constructor (id, name, pBrands) {
    this.id = id
    this.name = name
    // this.ownBrands = ownBrands
    this.permitBrands = pBrands
  }
}

const ConvCUser = {
  toFirestore (user) {
    return {
      id: user.id,
      name: user.name,
      permitBrands: user.permitBrands
    }
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return new CUser(data.id, data.name, data.permitBrands)
  }
}

exports.CUser = CUser
exports.ConvCUser = ConvCUser
