'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvoiceScheduleSchema extends Schema {
  up () {
    this.create('invoice_schedules', (table) => {
      table.uuid('id').primary();
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('invoice_id', 36);
      
      // content
      table.integer('month_day');
      table.integer('duration').default(1);
      table.integer('interval').default(1);
      table.string('monthly').default(1);
      table.date('start_date');
      table.timestamps();
    })
  }

  down () {
    this.drop('invoice_schedules')
  }
}

module.exports = InvoiceScheduleSchema
