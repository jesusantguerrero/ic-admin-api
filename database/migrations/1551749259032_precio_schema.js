'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Priceschema extends Schema {
  up () {
    this.create('prices', (table) => {
      table.increments()
      table.integer('id_company').unsigned().references('id').inTable('companies')
      table.integer('id_servicio').unsigned().references('id').inTable('services');
      table.text('descripcion');
      table.decimal('monto', 11, 2);
      table.boolean('activo').default(1);
      table.timestamps()
    })
  }

  down () {
    this.drop('prices')
  }
}

module.exports = Priceschema
