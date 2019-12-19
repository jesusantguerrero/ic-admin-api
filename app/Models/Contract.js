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

    ip() {
        return this.belongsTo('App/Models/Ip')
    }
    
    client() {
        return this.belongsTo('App/Models/Client')
    }

    network() {
        return this.belongsTo('App/Models/Router', 'network_id')
    }

    service() {
        return this.belongsTo('App/Models/Service')
    }

    price() {
        return this.belongsTo('App/Models/Service')
    }
    
    user() {
        this.belongsTo('App/Models/User')
    }

    createInvoices() {

    }

    assingnIp() {

    }

    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
        formData.user_id = auth.user.id;
    }
}

module.exports = Contract
