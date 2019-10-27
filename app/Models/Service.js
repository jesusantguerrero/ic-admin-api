'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const LineItem = use('App/Models/LineItem')
const Stock = use('App/Models/Stock')

class Service extends Model {
    stock() {
        return this.belongsTo('App/Models/Stock')
    }

    async updateStock() {
        const invoices = await LineItem.query().where({service_id: this.id, resource_parent_type: 'INVOICE'}).sum('quantity as qty')
        const expenses = await LineItem.query().where({service_id: this.id, resource_parent_type: 'EXPENSE'}).sum('quantity as qty')
        const stock = await Stock.findBy({ service_id: this.id})
        stock.stock = expenses[0].qty - invoices[0].qty
        await stock.save()
    }
}

module.exports = Service
