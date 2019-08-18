'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SettingSchema extends Schema {
  up () {
    this.create('settings', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id', 36).references('id').inTable('companies')
      table.string('name', 100)
      table.string('datatype', 50)
      table.text('value')
      table.timestamps()
    })
  }

  down () {
    this.drop('settings')
  }
}

module.exports = SettingSchema
