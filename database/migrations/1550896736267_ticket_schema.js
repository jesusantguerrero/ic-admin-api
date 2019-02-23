'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketSchema extends Schema {
  up () {
    this.create('tickets', (table) => {
      table.increments()
      table.integer("assigned_id").unsigned().references('id').inTable('users')
      table.integer("reporter_id").unsigned().references('id').inTable('users')
      table.integer("milestone_id").unsigned()
      table.integer("label_id").unsigned()
      table.string('title', 100)
      table.text('description')
      table.date('due_date')
      table.integer("status",3)
      table.timestamps()
    })
  }

  down () {
    this.drop('tickets')
  }
}

module.exports = TicketSchema
