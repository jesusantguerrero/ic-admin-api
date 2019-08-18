'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketSchema extends Schema {
  up () {
    this.create('tickets', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid("assigned_id", 36).references('id').inTable('users')
      table.uuid("reporter_id", 36).references('id').inTable('users')
      table.uuid("milestone_id", 36).references('id').inTable('milestones')
      table.uuid("label_id", 36).references('id').inTable('labels')
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
