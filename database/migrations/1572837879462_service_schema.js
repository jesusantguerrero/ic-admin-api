'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.table('services', (table) => {
      table.string('category_name', 100)
      table.boolean('sellable').default(true)
      table.uuid('incomming_account')
      table.boolean('billable').default(false)
      table.uuid('expense_account')
    })
  }

  down () {
    this.table('services', (table) => {
      // reverse alternations
      table.dropColumn('category_name')
      table.dropColumn('sellable')
      table.dropColumn('incomming_account')
      table.dropColumn('billable')
      table.dropColumn('expense_account')
    })
  }
}

module.exports = ServiceSchema
