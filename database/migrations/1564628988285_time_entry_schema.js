'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimeEntrySchema extends Schema {
  up () {
    this.create('time_entries', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid("user_id", 36).references('id').inTable('users')
      table.uuid("milestone_id", 36)
      table.json("label_ids")
      table.text("description")
      table.boolean("billable").default(false)
      table.timestamp("start", {useTz: false})
      table.timestamp("end", { useTz: false})
      table.time("duration")
      table.boolean("status").default(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('time_entries')
  }
}

module.exports = TimeEntrySchema
