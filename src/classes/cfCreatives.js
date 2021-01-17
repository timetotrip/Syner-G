'use strict'

class CCreative {
  constructor () {
    this.id = ''
    this.title = ''
    this.type = ''
    this.url = ''
    this.synergy = {}
    this.pv = 0
    this.like = 0
    this.dateCreate = ''
    this.dateUpdate = ''
  }

  setIdUrl (id, url) {
    this.id = id
    this.url = url
  }

  toObj () {
    const ret = {}
    ret.id = this.id
    ret.title = this.title
    ret.type = this.type
    ret.url = this.url
    ret.synergy = this.synergy
    ret.pv = this.pv
    ret.like = this.like
    ret.dateCreate = this.dateCreate
    ret.dateUpdate = this.dateUpdate
    return ret
  }

  fromObj (obj) {
    this.id = obj.id
    this.title = obj.title
    this.type = obj.type
    this.url = obj.url
    this.synergy = Object.assign({}, obj.synergy)
    this.pv = obj.pv
    this.like = obj.like
    this.dateCreate = obj.dateCreate
    this.dateUpdate = obj.dateUpdate
  }
}

const ConvCCreative = {
  toFirestore (creative) {
    return creative.toObj()
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    const creative = new CCreative()
    creative.fromObj(data)
    creative.id = snapshot.id
    return creative
  }
}

exports.CCreative = CCreative
exports.ConvCCreative = ConvCCreative
