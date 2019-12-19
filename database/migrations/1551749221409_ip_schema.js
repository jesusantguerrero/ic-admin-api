'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IpSchema extends Schema {
  up () {
    this.create('ips', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('router_id', 36).references('id').inTable('routers');
      // table.uuid('device_id', 36).references('id').inTable('routers');
      // table.uuid('contract_id', 36).references('id').inTable('contract_id');
      table.string('final_code', 15);
      table.integer('status').comment('0 = disponible,1 = ocupado, 2 = sectorial');
      table.timestamps()
    })
  }

  down () {
    this.drop('ips')
  }
}

module.exports = IpSchema
