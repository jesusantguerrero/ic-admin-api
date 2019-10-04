'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvoiceDeliverySchema extends Schema {
  up () {
    this.create('invoice_deliveries', (table) => {
      table.uuid('id').primary();
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('invoice_id', 36);
      
      // content
      table.boolean('send_pdf');
      table.boolean('auto_send');
      table.boolean('copy_myself');
      table.text('message');
      table.text('client_emails');
      table.text('sender_email');
      table.timestamps();
    })
  }

  down () {
    this.drop('invoice_deliveries')
  }
}

module.exports = InvoiceDeliverySchema
