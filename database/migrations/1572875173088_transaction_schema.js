'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.uuid('id').primary();
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('resource_id', 36).nullable();
      table.uuid('resource_type_id', 36).nullable();
      table.uuid('client_id', 36);
      table.uuid('user_id', 36);
      table.integer('number')
      table.date('date');

      // header
      table.string('concept', 50);
      table.string('description', 200);

      // footer
      table.text('notes').nullable();

      // totals
      table.decimal('total', 11, 2).default(0.00);
      table.enu('status', ['draft','verified', 'canceled']).default('draft');
      table.timestamps();
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
