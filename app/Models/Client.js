'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')

class Client extends Model {
    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
    }

    static get connection() {
        return 'mysql_sphinx';
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
