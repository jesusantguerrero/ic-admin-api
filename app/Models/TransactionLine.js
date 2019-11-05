'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')

class TransactionLine extends Model {
    account() {
        return this.belongsTo('App/Models/Account')
    }

    category() {
        return this.belongsTo('App/Models/Category')
    }
}

module.exports = TransactionLine
