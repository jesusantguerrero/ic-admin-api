'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.uuid('id').primary();
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('parent_id', 36).nullable();
      table.uuid('resource_type_id', 36).nullable();
      table.string('resource_type', 100).nullable();
      table.string('name', 100);
      table.string('description', 200).nullable();
      table.integer('index').default(0);
      table.integer('depth').default(0);
      table.enu('status', ['disabled','active']).default('active');
      table.timestamps();
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
