'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimeEntryLabelSchema extends Schema {
  up () {
    this.create('time_entry_labels', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid("user_id", 36).references('id').inTable('users')
      table.uuid("time_entry_id", 36).references('id').inTable('time_entries')
      table.uuid("label_id", 36).references('id').inTable('labels')
      table.timestamps()
    })
  }

  down () {
    this.drop('time_entry_labels')
  }
}

module.exports = TimeEntryLabelSchema
