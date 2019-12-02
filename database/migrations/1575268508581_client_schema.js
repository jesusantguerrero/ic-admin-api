'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.table('clients', (table) => {
      table.string('display_name', 150);
      table.boolean('is_customer').default(true);
      table.boolean('is_vendor');
      table.boolean('is_employee');
    })
  }

  down () {
    this.table('clients', (table) => {
      table.dropColumn('display_name');
      table.dropColumn('is_customer');
      table.dropColumn('is_vendor');
      table.dropColumn('is_employee');
    })
  }
}

module.exports = ClientSchema
