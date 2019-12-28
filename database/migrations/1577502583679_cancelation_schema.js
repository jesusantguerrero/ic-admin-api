'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CancelationSchema extends Schema {
  up () {
    this.create('cancelations', (table) => {
      table.uuid('id').primary();
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('contract_id', 36).references('id').inTable('contracts');
      table.text('reason')
      table.timestamps()
    })
  }

  down () {
    this.drop('cancelations')
  }
}

module.exports = CancelationSchema
