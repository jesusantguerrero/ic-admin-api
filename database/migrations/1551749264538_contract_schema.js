'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractSchema extends Schema {
  up () {
    this.create('contracts', (table) => {
      table.increments()
      table.integer('id_company').unsigned().references('id').inTable('companies');
      table.integer('id_usuario').unsigned().references('id').inTable('users');
      table.integer('id_cliente').unsigned().references('id').inTable('clients');
      table.integer('id_servicio').unsigned().references('id').inTable('services');
      table.integer('id_precio').unsigned().references('id').inTable('prices');
      table.integer('id_ip').unsigned().references('id').inTable('ips');
      table.string('codigo', 6);
      table.date('fecha');
      table.integer('duracion');
      table.integer('estado').comment('activo, saldado, cancelado, mora, suspendido').default(1);
      table.string('nombre_equipo', 50);
      table.string('mac_equipo', 50);
      table.string('modelo', 50);
      table.string('router', 50);
      table.string('mac_router', 50);
      table.boolean('instalado');
      table.text('observaciones');
      table.date('fecha_suspencion');
      table.timestamps()
    })
  }

  down () {
    this.drop('contracts')
  }
}

module.exports = ContractSchema
