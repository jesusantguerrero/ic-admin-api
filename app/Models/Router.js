'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const Ip = use('App/Models/Ip')

class Router extends Model {
    static boot () {
        super.boot()
    
        this.addHook('afterCreate', async (RouterInstance) => {
            await Router.createIps(RouterInstance)
        })
      }

    ips() {
        return this.hasMany('App/Models/Ip', 'id', 'router_id' )
    }

    static async createIps(RouterInstance) {
        for (let i=2; i <= 250; i++) {
           await  RouterInstance.ips().create({
                company_id: RouterInstance.company_id,
                final_code: i,
                status: 0
            })
        }

    }

    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
    }
}

module.exports = Router
