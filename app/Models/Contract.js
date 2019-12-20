'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const ContractJobs = use('App/Domain/Contract/Jobs/Index');

class Contract extends Model {
    static boot () {
        super.boot()

        this.addHook('afterCreate', async (contract) => {
           this.createInvoices(contract);
        })
        
        this.addHook('afterSave', async (contract) => {
            this.createInvoices(contract);
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

    invoices() {
        return this.hasMany('App/Models/Invoice', 'id', 'resource_id' )
    }

    static async createInvoices(ContractInstance) {
        ContractJobs.add({contract: ContractInstance})
        return;
    }

    assingnIp() {

    }

    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
        formData.user_id = auth.user.id;
    }
}

module.exports = Contract
