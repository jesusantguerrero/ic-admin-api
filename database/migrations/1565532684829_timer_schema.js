'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimerSchema extends Schema {
  up () {
    this.create('timers', (table) => {
      table.increments()
      table.text("milestone_id")
      table.json("label_ids")
      table.text("description")
      table.boolean("billable").default(false)
      table.datetime("start")
      table.datetime("end")
      table.time("duration")
      table.boolean("status").default(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('timers')
  }
}

module.exports = TimerSchema
