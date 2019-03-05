'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractSchema extends Schema {
  up () {
    this.create('contracts', (table) => {
      table.increments()
      table.integer('id_usuario').references('id').inTable('users');
      table.integer('id_cliente').references('id').inTable('clients');
      table.integer('id_servicio').references('id').inTable('services');
      table.string('codigo', 6);
      table.date('fecha');
      table.integer('duracion');
      table.integer('estado').comment('activo, saldado, cancelado, mora, suspendido').default(1);
      table.string('nombre_equipo', 50);
      table.string('mac_equipo', 50);
      table.string('modelo', 50);
      table.string('router', 50);
      table.string('mac_router', 50);
      table.string('ip', 15);
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
