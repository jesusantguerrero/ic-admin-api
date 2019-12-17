'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')

class Contract extends Model {
    static boot () {
        super.boot()

        this.addHook('afterCreate', async (contract) => {
        })

        this.addHook('afterSave', async (contract) => {
        })

        this.addHook('beforeDelete', async (contract) => {

        })
    }
    createInvoices() {

    }

    assingnIp() {

    }
}

module.exports = Contract
