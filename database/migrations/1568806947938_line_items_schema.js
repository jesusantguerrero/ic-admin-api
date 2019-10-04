'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LineItemsSchema extends Schema {
  up () {
    this.create('line_items', (table) => {
      table.uuid('id').primary();
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('invoice_id', 36);
      
      // content
      table.uuid('service_id', 36);
      table.text('concept', 200);
      table.decimal('price', 11, 2).default(0.00);
      table.decimal('quantity', 11, 2).default(0.00);
      table.integer('index').nullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('line_items')
  }
}

module.exports = LineItemsSchema
