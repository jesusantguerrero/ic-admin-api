'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
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
    await Factory.model('App/Models/Category').createMany(3, [{ 
        name: 'Assets',
        resourceType: 'ACCOUNT', 
      },{
        name: 'Income',
        resourceType: 'ACCOUNT',
      },{
        name: 'Expense',
        resourceType: 'ACCOUNT'
      } 
    ])
  }
}

module.exports = ResourceTypeSeeder
