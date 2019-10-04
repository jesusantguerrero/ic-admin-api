'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvoiceColumnsSchema extends Schema {
  up () {
    this.create('invoice_columns', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('invoice_columns')
  }
}

module.exports = InvoiceColumnsSchema
