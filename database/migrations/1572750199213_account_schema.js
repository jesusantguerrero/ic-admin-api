'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountSchema extends Schema {
  up () {
    this.create('accounts', (table) => {
      table.uuid('id').primary();
      table.uuid('company_id', 36).references('id').inTable('companies');
      table.uuid('category_id', 36).references('id').inTable('categories');
      table.string('display_id', 100);
      table.string('name', 100);
      table.string('description', 200).nullable();
      table.string('currency_code', 4).default("DOP");
      table.integer('index').default(0);
      table.boolean('archivable').default(0);
      table.boolean('archived').default(0);
      table.enu('balance_type', ['DEBIT','CREDIT']).default('DEBIT');
      table.enu('status', ['disabled','active']).default('active');
      table.timestamps();
    })
  }

  down () {
    this.drop('accounts')
  }
}

module.exports = AccountSchema
