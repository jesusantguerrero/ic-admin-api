'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentsSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.uuid('primary')
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('id_resource_id', 36);
      table.uuid('resource_type_id', 36);
      table.uuid('client_id', 36);
      table.uuid('user_id', 36);
      table.uuid('service_id', 36);
      table.string('concept', 50);
      table.text('extra_details').nullable();
      table.text('discount_reason').nullable();
      table.decimal('subtotal', 11, 2).default(0.00);
      table.decimal('penalty', 11, 2).default(0.00);
      table.decimal('extra_amount', 11, 2).default(0.00);
      table.decimal('discount', 11, 2).default(0.00);
      table.decimal('total', 11, 2).default(0.00);
      table.decimal('debt', 11, 2).default(0.00);
      table.enu('status', ['draft','unpaid', 'paid', 'canceled']).default('draft');
      table.date('due_date');
      table.timestamps()
    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentsSchema
