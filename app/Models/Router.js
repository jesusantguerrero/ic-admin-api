'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const RouterJobs = use('App/Domain/Network/Jobs/Index');

class Router extends Model {
    static boot () {
        super.boot()
    
        this.addHook('afterCreate', async (RouterInstance) => {
            RouterInstance.base_ip = "192.168.";
            await Router.createIps(RouterInstance)
        })

        this.addHook('beforeSave', async (RouterInstance) => {
            RouterInstance.base_ip = "192.168.";
        })
      }

    ips() {
        return this.hasMany('App/Models/Ip', 'id', 'router_id' )
    }

    static async createIps(RouterInstance) {
        RouterJobs.add({router: RouterInstance})
        return;
    }

    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
    }
}

module.exports = Router
