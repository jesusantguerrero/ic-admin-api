'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')

class Ip extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }

    router () {
        return this.belongsTo('App/Models/Router')
    }
}

module.exports = Ip
