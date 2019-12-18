const Queue = require('bull');
const createSearchRowQueue = new Queue('create search row', 'redis://127.0.0.1:6379');
const SearchActions = use('App/Domain/Search/Actions/SearchActions'); 

createSearchRowQueue.process(async function(job, done) {
    SearchActions.create(job.data.model, job.data.newRecord)
    done();
});

module.exports = createSearchRowQueue;