'use strict'

/*
|--------------------------------------------------------------------------
| RouterSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class RouterSeeder {
  async run () {
   await Factory.model('App/Models/Router').create()
  }
}

module.exports = RouterSeeder
