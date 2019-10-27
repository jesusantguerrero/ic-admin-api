'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.uuid('id').primary();
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('resource_type_id', 36).nullable();
      table.uuid('resource_type', 36).nullable();
      table.string('name', 100);
      table.string('description', 200).nullable();
      table.enu('status', ['disabled','active']).default('active');
      table.timestamps();
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
