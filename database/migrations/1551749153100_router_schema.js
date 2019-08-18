'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RouterSchema extends Schema {
  up () {
    this.create('routers', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.integer('codigo_area').unique();
      table.string('name', 100);
      table.string('base_ip', 8).default('192.168.');
      table.integer('posible_ips').default(250); 
      table.timestamps()
    })
  }

  down () {
    this.drop('routers')
  }
}

module.exports = RouterSchema
