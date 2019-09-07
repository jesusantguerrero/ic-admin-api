'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.string('names', 60);
      table.string('surename', 60);
      table.string('dni', 20);
      table.string('province', 50);
      table.string('city', 50);
      table.string('sector', 50);
      table.string('street', 50);
      table.string('ext_number', 30);
      table.string('phone', 15);
      table.string('cellphone', 15);
      table.integer('status').comment('inactive, active, debtor, suspended, desconected, free').default(1);
      table.text('observations');
      table.text('direction_details');
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
