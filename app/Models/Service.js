'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const LineItem = use('App/Models/LineItem')
const Stock = use('App/Models/Stock')

class Service extends Model {
    fill
    stock() {
        return this.belongsTo('App/Models/Stock')
    }

    category() {
        return this.belongsTo('App/Models/Category')
    }

    incommingAccount() {
        return this.belongsTo('App/Models/Account', 'incomming_account', 'id')
    }

    expenseAccount() {
        return this.belongsTo('App/Models/Account', 'expense_account', 'id')
    }

    async updateStock() {
        const invoices = await LineItem.query()
        .where({service_id: this.id, resource_parent_type: 'INVOICE'})
        .joinRaw("INNER JOIN invoices inv on inv.id = invoice_id and inv.status  IN('partial','unpaid','paid')")
        .sum('quantity as qty')
        
        const expenses = await LineItem.query()
        .where({service_id: this.id, resource_parent_type: 'EXPENSE'})
        .joinRaw("INNER JOIN invoices inv on inv.id = invoice_id and inv.status IN('partial','unpaid','paid')")
        .sum('quantity as qty')
        
        const stock = await Stock.findBy({ service_id: this.id})
        stock.stock = expenses[0].qty - invoices[0].qty
        await stock.save()
    }

    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
    }
}

module.exports = Service
