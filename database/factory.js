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

Factory.blueprint('App/Models/Invoice', async (faker) => {
    const user = await User.findBy("email", "jesusant.guerrero@gmail.com")
    
    return {
       company_id:  user.company_id,
       id_resource_id: "",
       resource_type_id: "INVOICE",
       client_id: "508fae1f-aedb-46bf-b8ec-9c6c0bbd4db6",
       user_id: user.id,
       number: 1,
       date: '2018-10-03',
       due_date: '2018-10-03',
 
       // header
       concept: "Invoice",
       description: "primer invoice",
       logo: "",
 
       // footer
       notes: "",
       footer: "",
 
       // totals
       subtotal: 10.00,
       penalty: 0.00,
       extra_amount: 0.00,
       discount: 0.00,
       total: 10.00,
       debt: 0
    }
})

// 

Factory.blueprint('App/Models/ResourceType', async (faker, i, data) => {
  const user = await User.findBy("email", "jesusant.guerrero@gmail.com")
  
  return {
     company_id:  user.company_id,
     name: data[i],
     description: `${data[i]} of the system`,
     allow_categories: false,
     status: 1,
  }
})

Factory.blueprint('App/Models/Category', async (faker, i, data) => {
  const user = await User.findBy("email", "jesusant.guerrero@gmail.com")
  
  return {
     company_id: user.company_id,
     parent_id: '',
     resource_type_id: '',
     resource_type: data[i].resourceType,
     name: data[i].name,
     description: `${data[i].name} of the system`,
     status: 1,
  }
})
