'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = require('./BaseModel')


class Ticket extends BaseModel {
    reporter() {
        return this.belongsTo('App/Models/User', 'reporter_id')
    }

    label() {
        return this.belongsTo('App/Models/Label')
    }

    assigned() {
        return this.belongsTo('App/Models/User', 'assigned_id')
    }

    milestone() {
        return this.belongsTo('App/Models/Milestone')
    }
}

module.exports = Ticket
