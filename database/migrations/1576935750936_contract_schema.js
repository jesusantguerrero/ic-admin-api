'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractSchema extends Schema {
  up () {
    this.table('contracts', (table) => {
      // alter table
      table.integer("payment_day", 2)
      table.string("service_name", 100)
      table.date("next_payment_date")
      table.date("last_payment_date")
      table.uuid("last_ip")
    })
  }
  
  down () {
    this.table('contracts', (table) => {
      table.dropColumn("payment_day")
      table.dropColumn("service_name")
      table.dropColumn("next_payment_date")
      table.dropColumn("last_payment_date")
      table.dropColumn("last_ip")
    })
  }
}

module.exports = ContractSchema
