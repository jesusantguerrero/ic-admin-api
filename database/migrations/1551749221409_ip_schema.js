'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IpSchema extends Schema {
  up () {
    this.create('ips', (table) => {
      table.increments()
      table.integer('id_company').unsigned().references('id').inTable('companies');
      table.integer('id_router').unsigned().references('id').inTable('routers');;
      table.integer('codigo_final');
      table.integer('estado').comment('0 = disponible,1 = ocupado, 2 = sectorial');
      table.timestamps()
    })
  }

  down () {
    this.drop('ips')
  }
}

module.exports = IpSchema
