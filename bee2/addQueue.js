const Queue = require('bee-queue');
const queue = new Queue('example');
const redis = require('redis');

const addQueue = new Queue('addition', {
    prefix: 'bq', //string, default 'bq'
    stallInterval : 5000, //number,ms; the length of the window in which workers must report
    //that they aren't stalling.
    nearTermWindow: 120000,
    delayedDebounce: 1000,
    redis: {
        host: '127.0.0.1',
        port: 6379,
        options: {}
    },
    isWorker: true,
    getEvents: true,
    sendEvents: true,
    storeJobs: true,
    ensureScripts: true,
    activateDelayedJobs: false,
    removeOnSuccess: false,
    removeOnFailure: false,
    redisScanCount: 100
});

const job = addQueue.createJob({
    x: 2,
    y: 3
});
job.timeout(3000)
   .retries(2)
   .save()
   .then((job) => {
     //job enqueued, 
     console.log('JobId', job.id);
   });

const processJob = addQueue.process(function(job, done){
    console.log('Processing job', job.id);
    return done(null, job.data.x + job.data.y);
});

addQueue.process(async (job) => {
    job.reportProgress({
        page: 3,
        totalPages: 11
    });

});

const sharedConfig = {
    // getEvents: false,
    // isWorker: false,
    redis: redis.createClient(process.env.DB_HOST)
};

const emailQueue = new Queue('EMAIL_DELIVERY', sharedConfig);
const facebookUpdateQueue = new Queue('FACEBOOK_UPDATE', sharedConfig);

emailQueue.process((job) => {});
facebookUpdateQueue.process((job) => {});

queue.on('ready', () => {
    console.log('queue now ready to start doing things');
});


queue.on('error', (err) => {
    console.log(`A queue error happened: ${err.message}`);
});

queue.on('succeeded', (job, result) =>{
    console.log(`Job ${job.id} succeeded with result: ${result}`);
});

queue.getJobs('waiting', {
    start: 0,
    end: 25
})
.then((jobs) => {
    const jobIds = jobs.map((job) => job.id);
    console.log(`Job ids: ${jobIds.join(' ')}`);
});


queue.getJobs('failed', {
    size: 100
})
.then((jobs) => {
    const jobIds = jobs.map((job) => job.id);
    console.log(`Job ids: ${jobIds.join(' ')}`);
});

module.exports.addQueue = addQueue;
module.exports.job = job;
module.exports.emailQueue = emailQueue;

