'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemsSchema extends Schema {
  up () {
    this.create('items', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.string('name', 100)
      table.text('description')
      table.decimal('price', 2)
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }
}

module.exports = ItemsSchema
