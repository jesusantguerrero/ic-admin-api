'use strict'

const { test, trait } = use('Test/Suite')('Ticket')
const { getUser} = require('./auth')

trait('Test/ApiClient')
trait('Auth/Client')

test('get list of tickets', async ({ client }) => {
  const response = await client
  .get('/api/v1/tickets')
  .loginVia(await getUser(), 'jwt')
  .end()

  response.assertStatus(200)
})

