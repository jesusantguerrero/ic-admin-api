'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StockSchema extends Schema {
  up () {
    this.create('stocks', (table) => {
      table.uuid('id').primary();
      table.uuid('company_id').references('id').inTable('companies');
      table.uuid('service_id').references('id').inTable('services');
      table.uuid('warehouse_id').nullable();
      table.uuid('zone_id').nullable();
      table.uuid('rack_id').nullable();
      table.integer('stock').default(0);
      table.integer('stock_min');
      table.integer('stock_alarm');
      table.integer('stock_max');
      table.timestamps();
    })
  }

  down () {
    this.drop('stocks')
  }
}

module.exports = StockSchema
