const Queue = require('bull');
const SetupQueue = new Queue('setup company', 'redis://127.0.0.1:6379');
const SetupAction = use('App/Domain/Application/Actions/Setup')

createIpQueue.process((job, done) => {
  SetupAction(job.data.model)
  done()
});

module.exports = createIpQueue;
