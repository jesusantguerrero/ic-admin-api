'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.integer('id_company').unsigned().references('id').inTable('companies');
      table.string('nombre', 30)
			table.text('descripcion')
			table.decimal('mensualidad', 11, 2)
			table.integer('tipo').comment('servicios, reparacion, producto')
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
