'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const Ip = use('App/Models/Ip')

class Router extends Model {
    ips() {
        return this.hasMany('App/Models/Ip', 'id', 'id_router' )
    }
}

module.exports = Router
