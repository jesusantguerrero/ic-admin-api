'use strict'

/*
|--------------------------------------------------------------------------
| ResourceTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ResourceTypeSeeder {
  async run () {
    await Factory.model('App/Models/ResourceType').createMany(4, ['INVOICE', 'EXPENSE', 'PRODUCT', 'ACCOUNT'])
  }
}

module.exports = ResourceTypeSeeder
