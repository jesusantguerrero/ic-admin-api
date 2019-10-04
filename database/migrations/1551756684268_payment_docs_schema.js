'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentDocsSchema extends Schema {
  up () {
    this.create('payment_docs', (table) => {
      table.uuid('id').primary()
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('resource_id', 36);
      table.uuid('user_id', 36);

      table.date('payment_date');
      table.decimal('amount', 11, 2);
      table.string('concept', 50);
      table.uuid('payment_method_id', 36);
      table.uuid('payment_account_id', 36);
      table.text('notes');
      
      table.boolean('checked').default(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentDocsSchema
