'use strict'

/*
|--------------------------------------------------------------------------
| ServiceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ServiceSeeder {
  async run () {
    await Factory.model('App/Models/Service').create()
  }
}

module.exports = ServiceSeeder
