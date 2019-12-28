'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')

class Cancelation extends Model {
    contract () {
        return this.belongsTo('App/Models/Contract')
    }
}

module.exports = Cancelation
