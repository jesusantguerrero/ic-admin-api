'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.table('services', (table) => {
      // alter table
      table.uuid('category_id').nullable();
      table.uuid('uom_id').nullable();
      table.uuid('stock_id').nullable();
      table.uuid('lote_id').nullable();
      table.integer('pack_size').nullable();
      table.text('warranty_terms').nullable();
      table.boolean('has_stock').default(false);
    })
  }
  
  down () {
    this.table('services', (table) => {
      // reverse alternations
      table.dropColumn('category_id')
      table.dropColumn('uom_id')
      table.dropColumn('stock_id')
      table.dropColumn('lote_id')
      table.dropColumn('pack_size')
      table.dropColumn('warranty_terms')
      table.dropColumn('has_stock');
    })
  }
}

module.exports = ServiceSchema
