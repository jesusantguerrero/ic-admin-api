'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RouterSchema extends Schema {
  up () {
    this.table('routers', (table) => {
      table.integer('used_ips', 3)
    })
  }

  down () {
    this.table('routers', (table) => {
      table.dropColumn('used_ips')
    })
  }
}

module.exports = RouterSchema
