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
        
        this.addHook('afterSave', async (lineItem) => {
            await LineItem.updateStock(lineItem);
        })
    }

    service() {
        return this.belongsTo('App/Models/Service')
    }
    
    static async updateStock(lineItem) {
        try {
            const service = await lineItem.service().fetch();
            await service.updateStock();
        } catch (e) {
            console.log("nada que ver", e)
        }
    }
}

module.exports = LineItem
