'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvoiceSchema extends Schema {
  up () {
    this.table('invoices', (table) => {
      table.string('resource_parent_type', 200)
    })
  }
  
  down () {
    this.table('invoices', (table) => {
      // reverse alternations
      table.dropColumn('resource_parent_type', 200)
    })
  }
}

module.exports = InvoiceSchema
