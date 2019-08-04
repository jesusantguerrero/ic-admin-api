'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimeEntryLabelSchema extends Schema {
  up () {
    this.create('time_entry_labels', (table) => {
      table.increments()
      table.integer('id_company').unsigned().references('id').inTable('companies');
      table.integer("user_id").unsigned().references('id').inTable('users')
      table.integer("time_entry_id").unsigned().references('id').inTable('time_entries')
      table.integer("label_id").unsigned().references('id').inTable('labels')
      table.timestamps()
    })
  }

  down () {
    this.drop('time_entry_labels')
  }
}

module.exports = TimeEntryLabelSchema
