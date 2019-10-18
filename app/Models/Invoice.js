'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const Service = use('App/Models/Service')
const LineItem = use('App/Models/LineItem')
const uuid = require('uuid/v4')

class Invoice extends Model {
    static boot () {
        super.boot()
      }

    lineItems() {
        return this.hasMany('App/Models/LineItem', 'id', 'invoice_id' )
    }

    client() {
        return this.belongsTo('App/Models/Client')
    }

    static async createLines(invoice, items) {
        return new Promise(async (resolve) => {
            try {
                await LineItem.query().where('invoice_id', invoice.id).delete();
                if (!items || !items.length) {
                    return
                }

                items.forEach(async item => {
                    if (!item.service_name) {
                        item.service_name = await Service.find(item.service_id)
                        item.service_name = item.service_name.name
                    }
        
                    await invoice.lineItems().create({
                        amount: item.amount,
                        concept: item.concept,
                        index: item.index,
                        price: item.price,
                        quantity: item.quantity,
                        service_id: item.service_id,
                        service_name: item.service_name,
                        company_id: invoice.company_id,
                        id: uuid()
                    }).catch(err => console.log(err))
                })
            } catch(e) {
                console.log(e)
            }    
            resolve()
        })
    }

    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
    }
}

module.exports = Invoice
