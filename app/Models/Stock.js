'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const Database = use('Database')

class Stock extends Model {
    service() {
        return this.belongsTo('App/Models/Service')
    }
}

module.exports = Stock
