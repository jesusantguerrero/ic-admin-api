const Queue = require('bull');
const contractQueue = new Queue('create contract invoice', 'redis://127.0.0.1:6379');
const createContractInvoice= use('App/Domain/Contract/Jobs/CreateContractInvoice'); 

contractQueue.process(createContractInvoice);
module.exports = contractQueue;