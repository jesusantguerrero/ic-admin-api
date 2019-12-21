const { test } = use('Test/Suite')('Example unit test')
const { findNextDate } = require('../../../app/Domain/Contract/Jobs/contractJobs'); 

test('find next date for normal', async ({ assert }) => {
    console.log(findNextDate)
  assert.equal(findNextDate('2018-06-25'), '2018-07-25')
})

test('find next date for feb', async ({ assert }) => {
    console.log(findNextDate)
  assert.equal(findNextDate('2019-01-30'), '2019-02-28')
})

test('find next date for 31 dates', async ({ assert }) => {
    console.log(findNextDate)
  assert.equal(findNextDate('2019-10-31'), '2019-11-30')
})