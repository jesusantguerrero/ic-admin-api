'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const Service = use('App/Models/Service')

class LineItem extends Model {
    static boot() {
        super.boot()

        this.addHook('afterCreate', async (lineItem) => {
            await LineItem.updateStock(lineItem);
        })
    }

    service() {
        return this.belongsTo('App/Models/Service')
    }
    
    static async updateStock(lineItem) {
        try {
           const service = await lineItem.service().fetch();
           service = await service.updateStock();
           return service;
        } catch (e) {
        }
    }
    
    static async updateStockFromService(serviceId) {
        try {
            const service = await Service.find(serviceId);
            service = await service.updateStock();
            return service;
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = LineItem
