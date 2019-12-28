'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel');
const Invoice = use('App/Models/Invoice');
const Ip = use('App/Models/Ip');
const ContractJobs = use('App/Domain/Contract/Jobs/Index');
const contractActions = use('App/Domain/Contract/Actions/ContractActions');

class Contract extends Model {
    static boot () {
        super.boot()

        this.addHook('afterCreate', async (contract) => {
          this.createInvoices(contract);
        })

        this.addHook('afterSave', async (contract) => {
            // await contract.assingnIp();
        })

        this.addHook('afterUpdate', async (contract) => {
          await contract.assingnIp();
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
        ContractJobs.add('createInvoices', {contract: ContractInstance})
        return;
    }

    async upgrade(oldServiceId) {
        ContractJobs.add('upgradeInvoices', {contract: this, oldServiceId: oldServiceId})
        // await contractActions.upgradeInvoices(this, oldServiceId);
        return;
    }

    async lastInvoiceDate() {
        let lastInvoice = await Invoice.query().where({resource_id: this.id}).select('due_date').orderBy('due_date', 'DESC').limit(2).fetch();
        lastInvoice = lastInvoice.toJSON()
        return lastInvoice[0]['due_date'];  //Date
    }

    async addMonths(duration) {
        return await contractActions.extendContract(this, duration);
    }

    cancel(cancelationData) {
        ContractJobs.add('cancelContract', {contract: this, cancelationData})
        return
        // return contractActions.cancelContract(this, cancelationData);
    }

    async assingnIp() {
        await this.ip().where({id: this.ip_id}).update({ status: 1})
    }

    async releaseIp() {
        if (this.ip_id) {
            this.last_ip = this.ip_id;
            await this.ip().where({id: this.ip_id}).update({ status: 0})
        }
    }
    
    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
        formData.user_id = auth.user.id;
    }
}

module.exports = Contract
