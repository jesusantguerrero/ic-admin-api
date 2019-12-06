'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IpSchema extends Schema {
  up () {
    this.table('ips', (table) => {
      table.integer('index', 3).nullable()// alter table
    })
  }

  down () {
    this.table('ips', (table) => {
      table.dropColumn('index')// alter table
      // reverse alternations
    })
  }
}

module.exports = IpSchema
