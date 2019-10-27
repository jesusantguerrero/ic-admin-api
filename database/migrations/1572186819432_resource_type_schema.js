'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResourceTypeSchema extends Schema {
  up () {
    this.create('resource_types', (table) => {
      table.uuid('id').primary();
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.string('name', 100);
      table.string('description', 200).nullable();
      table.boolean('allow_categories').default(true);
      table.enu('status', ['disabled','active']).default('active');
      table.timestamps();
    })
  }

  down () {
    this.drop('resource_types')
  }
}

module.exports = ResourceTypeSchema
