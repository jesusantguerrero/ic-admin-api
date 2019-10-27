'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LineItemsSchema extends Schema {
  up () {
    this.table('line_items', (table) => {
      // alter table
      table.string('resource_parent_type', 200).default('INVOICE')
    })
  }

  down () {
    this.table('line_items', (table) => {
      // reverse alternations
      table.dropColumn('resource_parent_type')
    })
  }
}

module.exports = LineItemsSchema
