'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionLineSchema extends Schema {
  up () {
    this.create('transaction_lines', (table) => {
      table.uuid('id').primary();
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('transaction_id', 36);
      
      // content
      table.uuid('account_id', 36);
      table.uuid('category_id', 36);
      table.integer('type', 1).comment("1 debit, -1 credit");
      table.text('concept', 300);
      table.decimal('amount', 11, 2).default(0.00);
      table.integer('index').nullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('transaction_lines')
  }
}

module.exports = TransactionLineSchema
