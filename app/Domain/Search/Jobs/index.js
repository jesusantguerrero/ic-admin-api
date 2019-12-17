const Queue = require('bull');
const createIpQueue = new Queue('create ips', 'redis://127.0.0.1:6379');
const createIpQueueProcess = use('App/Domain/Network/Jobs/CreateIpJobs') 

createIpQueue.process(createIpQueueProcess);

module.exports = createIpQueue;