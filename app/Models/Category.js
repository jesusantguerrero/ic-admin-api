'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = require('./BaseModel')

class Category extends Model {
    subCategories() {
        return this.hasMany('App/Models/Category', 'id', 'parent_id' )
    }

    accounts() {
        return this.hasMany('App/Models/Account', 'id', 'category_id' )
    }

    static customCreationHook(formData, auth) {
        formData.company_id = auth.user.company_id;
    }
}

module.exports = Category
