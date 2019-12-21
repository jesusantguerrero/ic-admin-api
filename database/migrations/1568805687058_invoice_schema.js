'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvoiceSchema extends Schema {
  up () {
    this.create('invoices', (table) => {
      table.uuid('id').primary();
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('resource_id', 36).nullable();
      table.uuid('resource_type_id', 36).nullable();
      table.uuid('client_id', 36);
      table.uuid('user_id', 36);
      table.integer('serie', 4)
      table.integer('number', 6)
      table.date('date');
      table.date('due_date');

      // header
      table.string('concept', 50);
      table.string('description', 200);
      table.text('logo').nullable();

      // footer
      table.text('notes').nullable();
      table.text('footer').nullable();

      // totals
      table.decimal('subtotal', 11, 2).default(0.00);
      table.decimal('penalty', 11, 2).default(0.00);
      table.decimal('extra_amount', 11, 2).default(0.00);
      table.decimal('discount', 11, 2).default(0.00);
      table.decimal('total', 11, 2).default(0.00);
      table.decimal('debt', 11, 2).default(0.00);
      table.enu('status', ['draft','unpaid','partial', 'paid', 'canceled']).default('draft');
      table.timestamps();
    })
  }

  down () {
    this.drop('invoices')
  }
}

module.exports = InvoiceSchema
