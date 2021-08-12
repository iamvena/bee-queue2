const Queue = require('bee-queue');

const options = {
    removeOnSuccess: false,
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
};

const cookQueue = new Queue('cook', options);
const serveQueue = new Queue('serve', options);

cookQueue.process(3, (job, done) => {
    setTimeout(() => 
    console.log('Getting the ingredients ready'), 1000);
    setTimeout(()=> 
    console.log(`Preparing the dish ${job.data.dish}`), 1500);
    setTimeout(() => {
        console.log(`Order ${job.data.orderNo}: ${job.data.dish} ready`);
        done();
    }, job.data.qty * 5000);
});

cookQueue.on('succeeded', (job, result) => {
    serveQueue.createJob(job.data).save();
});

