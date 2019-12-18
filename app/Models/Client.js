'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')
const config = use('Config')

class Client extends Model {

    static get connection() {
      return this.useConnection !== "undefined" ? this.useConnection : config.get('database.connection')
    }

    static setUseConnection(access) {
      return access
    }

    static get searchable() {
      return true;
    }

    static get searchTable() {
      return 'clients';
    }

    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
    }

    // getters
    getCompleteName({name, surename}) {
        return `${name} ${surename}`;
    }

    getCompleteSurenameName({ name, surename}){
        return `${surename}, ${name}`;
    }
}

module.exports = Client
