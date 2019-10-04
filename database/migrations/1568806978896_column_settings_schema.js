'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ColumnSettingsSchema extends Schema {
  up () {
    this.create('column_settings', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('column_settings')
  }
}

module.exports = ColumnSettingsSchema
