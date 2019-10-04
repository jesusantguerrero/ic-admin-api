'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id').references('id').inTable('companies');
      table.string('name', 30)
			table.text('description')
			table.decimal('price', 11, 2)
			table.integer('frequence').comment('monthly, unit, bisemanal')
      table.integer('type').comment('servicios, reparacion, producto')
      table.boolean('sellable').default(false)
      table.uuid('incomming_account')
      table.boolean('billable').default(false)
      table.uuid('expense_account')
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
