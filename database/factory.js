'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

Factory.blueprint('App/Models/Client', async (faker) => {
  const user = await User.findBy("email", "jesusant.guerrero@gmail.com")
  
  return {
    company_id: user.company_id,
    names: "Barry",
    surename: "Bonds",
    dni: "00000000000000",
    province: "Section B",
    city: "Neverland",
    sector: "Neverland",
    street: "1",
    ext_number: "30",
  }
})

Factory.blueprint('App/Models/Router', async (faker) => {
    const user = await User.findBy("email", "jesusant.guerrero@gmail.com")
    
    return {
      company_id: user.company_id,
      codigo_area: faker.integer({min: 1, max: 255}),
      name:  faker.animal(),
      base_ip: "192.168.",
      posible_ips: 255
    }
})

Factory.blueprint('App/Models/Service', async (faker) => {
    const user = await User.findBy("email", "jesusant.guerrero@gmail.com")
    
    return {
       company_id:  user.company_id,
       name: "Oro",
       description: "Oro",
       price: 800,
       frequence: 0,
       type: 0
    }
})
