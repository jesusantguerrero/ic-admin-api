'use strict'

const { getUser} = require('./auth')
const { test, trait } = use('Test/Suite')('Time Entry')
const TimeEntry = use('App/Models/TimeEntry')
const time1 = {
  "start": "2019-07-31 11:54:00",
  "billable":false,
  "description":"jesus",
}

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')


test('get list of time entries', async ({ client }) => {
  const response = await client
  .get('/api/v1/time-entries')
  .loginVia(await getUser(), 'jwt')
  .end()

  response.assertStatus(200)
})

test('get filtered time entries', async ({ client }) => {
  const time2 = {...time1}
  time2.description = "pedro";

  TimeEntry.create(time1)
  TimeEntry.create(time2)

  const response = await client
  .get('/api/v1/time-entries?filter[description]=jesus')
  .loginVia(await getUser(), 'jwt')
  .end()

  response.assertStatus(200)
  // response.assertJSONSubset([{
  //   "description": "jesus"
  // }])
})

// test('get correctly sorted data time entries', async ({ client }) => {
 
//   const time2 = {...time1}
//   const time3 = {...time1}
//   time1.start = "2019-08-01 11:54:00";
//   time2.start = "2019-07-31 11:54:00";
//   time3.start = "2019-07-30 11:54:00";

//   let timeData1 = await TimeEntry.create(time1)
//   let timeData2 = await TimeEntry.create(time2)
//   let timeData3 = await TimeEntry.create(time3)
//   timeData1 = await TimeEntry.find(timeData1.id)
//   timeData2 = await TimeEntry.find(timeData2.id)
//   timeData3 = await TimeEntry.find(timeData3.id)

//   const response = await client
//   .get('/api/v1/time-entries?sort=start&limit=1')
//   .loginVia(await getUser(), 'jwt')
//   .end()

//   response.assertStatus(200)
//   response.assertJSONSubset([{
//     start: timeData3.start
//   }])
// })
