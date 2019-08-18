'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LabelSchema extends Schema {
  up () {
    this.create('labels', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.string('title', 100)
      table.text('description')
      table.string("color", 50)
      table.string("color_format", 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('labels')
  }
}

module.exports = LabelSchema
