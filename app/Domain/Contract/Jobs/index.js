const Queue = require('bull');
const contractQueue = new Queue('create contract invoice', 'redis://127.0.0.1:6379');
const contractJobs = use('App/Domain/Contract/Jobs/ContractJobs'); 

contractQueue.process(contractJobs.createInvoices);
module.exports = contractQueue;