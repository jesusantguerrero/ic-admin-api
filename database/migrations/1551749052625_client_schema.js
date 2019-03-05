'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.integer('id_company').unsigned().references('id').inTable('companies');
      table.string('nombres', 60);
      table.string('apellidos', 60);
      table.string('cedula', 20);
      table.string('provincia', 50);
      table.string('ciudad', 50);
      table.string('sector', 50);
      table.string('calle', 50);
      table.string('casa', 30);
      table.string('telefono', 15);
      table.string('celular', 15);
      table.string('lugar_trabajo', 150);
      table.string('telefono_trabajo', 15);
      table.decimal('ingresos', 11, 2);
      table.integer('estado').comment('inactivo, activo, mora, suspendido, en corte').default(1);
      table.text('observaciones');
      table.text('detalles_direccion');
      table.date('fecha_suspencion');
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
