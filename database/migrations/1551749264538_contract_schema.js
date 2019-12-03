'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractSchema extends Schema {
  up () {
    this.create('contracts', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('user_id', 36).references('id').inTable('users');
      table.uuid('client_id', 36).references('id').inTable('clients');
      table.uuid('service_id', 36).references('id').inTable('services');
      table.uuid('precio_id', 36).references('id').inTable('prices');
      table.uuid('ip_id', 36).references('id').inTable('ips');
      table.string('code', 6);
      table.date('date');
      table.integer('duration');
      table.enu('period', ['monthly', 'product'] );
      table.enu('estado', ['active', 'paid', 'canceled', 'late', 'suspended']).default('active');
      table.string('equipment', 50);
      table.string('equipment_mac', 50);
      table.string('model', 50);
      table.string('router', 50);
      table.string('mac_router', 50);
      table.boolean('installed');
      table.text('observations');
      table.date('suspension_date');
      table.timestamps()

      // tipo_de_pago
      // dia_de_pago
      // dias_creacion_facturas[-5, -10, -15]
      // dias_gracia
      // meses_para_suspencion 1, 2,3,4
      // aplica_mora
      // aplica_reconexion
      // router_id
      // ip_id
      // last_ip
    })
  }

  down () {
    this.drop('contracts')
  }
}

module.exports = ContractSchema
