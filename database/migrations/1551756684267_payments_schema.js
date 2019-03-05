'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentsSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.increments()
      table.integer('id_company').unsigned().references('id').inTable('companies');
      table.integer('id_contrato');
      table.integer('id_cliente');
      table.integer('id_usuario');
      table.integer('id_servicio');
      table.integer('id_precio').nullable();
      table.integer('id_extra').nullable();
      table.integer('id_abono').nullable();
      table.date('fecha_pago');
      table.string('concepto', 50);
      table.text('detalles_extra').nullable();
      table.text('razon_decuento').nullable();
      table.decimal('cuota', 11, 2);
      table.decimal('mora', 11, 2);
      table.decimal('monto_extra', 11, 2).nullable();
      table.decimal('descuento', 11, 2).nullable();
      table.decimal('total', 11, 2);
      table.decimal('deuda', 11, 2).default(0.00);
      table.integer('estado').comment('no pagado, pagado, cancelado').default(1);
      table.integer('forma_pago').comment('efectivo, banco').default(1);
      table.date('fecha_limite');
      table.boolean('generado').default(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentsSchema
