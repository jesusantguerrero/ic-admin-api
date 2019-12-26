'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractSchema extends Schema {
  up () {
    this.table('contracts', (table) => {
      // alter table
      table.integer('paid', 4)
      table.integer('late', 4)
    })
  }
  
  down () {
    this.table('contracts', (table) => {
      // reverse alternations
      table.dropColumn('paid')
      table.dropColumn('late')
    })
  }
}

module.exports = ContractSchema
