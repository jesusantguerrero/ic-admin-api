'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')

class Account extends Model {
    category() {
        return this.belongsTo('App/Models/Category')
    }
    
    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
    }
}

module.exports = Account
