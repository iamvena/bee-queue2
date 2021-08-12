const Queue = require('bee-queue');

const options = {
    removeOnSuccess: true,
    redis: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    },
}

const cookQueue = new Queue('cook' ,options);
const serveQueue = new Queue('serve', options);

//PUBLISHER
const placeOrder = (order) => {
    return cookQueue.createJob(order).save();
};

//CONSUMER
serveQueue.process((job, done) => {
    console.log(`🧾 ${job.data.qty}x ${job.data.dish} ready to be served 😋`);
    // Notify the client via push notification, web socket or email etc.
    done();
});

module.exports.placeOrder = placeOrder;
