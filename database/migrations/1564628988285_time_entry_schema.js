'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimeEntrySchema extends Schema {
  up () {
    this.create('time_entries', (table) => {
      table.increments()
      table.integer('id_company').unsigned().references('id').inTable('companies');
      table.integer("user_id").unsigned().references('id').inTable('users')
      table.integer("milestone_id").unsigned()
      table.integer("label_id").unsigned()
      table.text("description")
      table.boolean("billable").default(false)
      table.timestamp("start")
      table.timestamp("end")
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
