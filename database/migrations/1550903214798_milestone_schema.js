'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MilestoneSchema extends Schema {
  up () {
    this.create('milestones', (table) => {
      table.increments()
      table.integer('id_company').unsigned().references('id').inTable('companies');
      table.string('title', 100)
      table.text('description')
      table.date("due_date", 50)
      table.string("start_date", 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('milestones')
  }
}

module.exports = MilestoneSchema
