'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const Service = use('App/Models/Service')
const LineItem = use('App/Models/LineItem')
const PaymentDoc = use('App/Models/PaymentDoc')
const uuid = require('uuid/v4')
const Database = use('Database')

class Invoice extends Model {
    static boot () {
        super.boot()
        
        this.addHook('beforeCreate', async (InvoiceInstance) => {
            await Invoice.setNumber(InvoiceInstance)
        })
        
        this.addHook('beforeSave', async (InvoiceInstance) => {
            await Invoice.setNumber(InvoiceInstance);
            await Invoice.checkPayments(InvoiceInstance);
        })
      }

    lineItems() {
        return this.hasMany('App/Models/LineItem', 'id', 'invoice_id' )
    }

    paymentDocs() {
        return this.hasMany('App/Models/PaymentDoc', 'id', 'resource_id' )
    }

    client() {
        return this.belongsTo('App/Models/Client')
    }

    static async setNumber(InvoiceInstance) {
        let isInvalidNumber = true;

        if (InvoiceInstance.number) {
            isInvalidNumber = await Database.table('invoices').where({
                company_id: InvoiceInstance.company_id, 
                number: InvoiceInstance.number, 
                resource_type_id: InvoiceInstance.resource_type_id
            }).whereNot({
                id: InvoiceInstance.id
            });

            isInvalidNumber = isInvalidNumber.length
        }

        if (isInvalidNumber) {
            console.log(InvoiceInstance.resource_type_id);
            const result = await Database.table('invoices').where({
                company_id: InvoiceInstance.company_id, 
                resource_type_id: InvoiceInstance.resource_type_id
            }).max('number as number');
            InvoiceInstance.number = Number(result[0].number) + 1;
        }
    }

    static async createLines(invoice, items) {
        return new Promise(async (resolve) => {
            try {
                await LineItem.query().where('invoice_id', invoice.id).delete();
                if (!items || !items.length) {
                    return
                }

                items.forEach(async (item) => {
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

    createPaymentDoc(formData) {
       formData.amount = formData.amount > this.debt ? this.debt : formData.amount;

        return this.paymentDocs().create({
            ...formData,
            user_id: this.user_id,
            company_id: this.company_id
        })
    }

    async deletePaymentDoc(id) {
        const payment = await PaymentDoc.find(id);
        return payment.delete();
    }

   static async checkPayments(invoice) {
       if (invoice && invoice.paymentDocs) {
           const totalPaid = await PaymentDoc.query().where({resource_id: invoice.id}).sum('amount as amount')
           invoice.debt = parseFloat(invoice.total || 0) - parseFloat(totalPaid[0]['amount'] || 0);
           invoice.status = Invoice.checkStatus(invoice);
        //    await Invoice.query().where({id: invoice.id }).update(invoice);
        }
    }

    static checkStatus(invoice) {
        let status = invoice.status;
        if (invoice.debt > 0 && invoice.debt < invoice.total) {
            status = 'partial';
        } else if (invoice.debt == 0) {
            status = 'paid';
        } else if (invoice.debt == invoice.total) {
            status = 'unpaid';
        }

        return status;
    }

    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
        formData.user_id = auth.user.id;
    }
}

module.exports = Invoice
