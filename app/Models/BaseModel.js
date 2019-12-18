'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Freesgen/Adonis/BaseModel')

class BaseModel extends Model{

  static boot () {
    super.boot()
    this.addTrait('uuids')
  }

  static get incrementing () {
    return false
  }
}

module.exports = BaseModel
