'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Priceschema extends Schema {
  up () {
    this.create('prices', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id', 36).references('id').inTable('companies')
      table.uuid('service_id', 36).references('id').inTable('services');
      table.text('description');
      table.decimal('amount', 11, 2);
      table.boolean('active').default(1);
      table.timestamps()
    })
  }

  down () {
    this.drop('prices')
  }
}

module.exports = Priceschema
