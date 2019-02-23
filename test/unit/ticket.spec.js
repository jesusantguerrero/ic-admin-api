'use strict'

const { test, trait } = use('Test/Suite')('Ticket')
const Ticket = use('App/Models/Ticket')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

test('get list of tickets', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
  .get('/api/v1/tickets')
  .loginVia(user, 'jwt')
  .end()

  response.assertStatus(200)
})

