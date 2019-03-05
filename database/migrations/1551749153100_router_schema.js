'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RouterSchema extends Schema {
  up () {
    this.create('routers', (table) => {
      table.increments()
      table.integer('id_company').unsigned().references('id').inTable('companies');
      table.integer('codigo_area').unique();
      table.string('nombre', 100);
      table.string('base_ip', 8).default('192.168.');
      table.integer('registros_posibles').default(250); 
      table.timestamps()
    })
  }

  down () {
    this.drop('routers')
  }
}

module.exports = RouterSchema
