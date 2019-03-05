'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.string('RNC', 50);
      table.string('nombre', 50);
      table.text('logo');
      table.string('lema', 100);
      table.string('direccion', 100);
      table.string('telefono', 20);
      table.text('telefonos');
      table.timestamps()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompanySchema
