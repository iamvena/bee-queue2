// const Arena = require('bull-arena');
// const Bee  = require('bee-queue');

// const arena = Arena({
//   // Include a reference to the bee-queue or bull libraries, depending on the library being used.
//   Bee,
//   queues: [
//     {
//       // First queue configuration
//       type: 'bq',
//       name: 'Notif_emailer',
//       hostId: 'first_server',
//       redis: {
//           port: 6379,
//           host: '127.0.0.1'
//       }
//     },
//   ],
//   // Optionally include your own stylesheet
//   customCssPath: 'https://example.com/custom-arena-styles.css',

//   // Optionally include your own script
//   customJsPath: 'https://example.com/custom-arena-js.js',
// },
// {
//     basePath: "/",
//     disableListen: true,
//   });

//   const queuesConfig = {
//       type: 'bq',
//       name: 'Notif_emailer',
//       hostId: 'first_server',
//       redis: {
//           port: 6379,
//           host: '127.0.0.1'
//       }
//   };

//   const arenaConfig = Arena({
//     Bee,
//     queues: queuesConfig
//   }, {
//     basePath: "/",
//     disableListen: true,
//   });

// module.exports.arenaConfig = arenaConfig;

const Arena = require('bull-arena');
const Bee = require('bee-queue');
const RedisServer = require('redis-server');

// Select ports that are unlikely to be used by other services a developer might be running locally.
const HTTP_SERVER_PORT = 5000;
const REDIS_SERVER_PORT = 6379;

// Create a Redis server. This is only for convenience

// async function main() {
// //   const server = new RedisServer(REDIS_SERVER_PORT);
// //   await server.open();

// //   const queue = new Bee('name_of_my_queue', {
// //     activateDelayedJobs: true,
// //     redis: {
// //       port: REDIS_SERVER_PORT,
// //     },
// //   });

// //   // Fake process function to move newly created jobs in the UI through a few of the job states.
// //   queue.process(async function () {
// //     // Wait 5sec
// //     await new Promise((res) => setTimeout(res, 5000));

// //     // Randomly succeeds or fails the job to put some jobs in completed and some in failed.
// //     if (Math.random() > 0.5) {
// //       throw new Error('fake error');
// //     }
// //   });

// //   // adding delayed jobs
// //   await queue
// //     .createJob({})
// //     .delayUntil(Date.now() + 60 * 1000)
// //     .save();

// //   const job = await queue.createJob({}).save();

  
// }

const arenaConfig = Arena(
    {
      Bee,

      queues: [
        {
          // Required for each queue definition.
          name: 'serve',
          // User-readable display name for the host. Required.
          hostId: 'serve',
          // Queue type (Bull or Bee - default Bull).
          type: 'bee',  
          redis: {
             host: '127.0.0.1',
            port: REDIS_SERVER_PORT,
          },
        },
        {
          // Required for each queue definition.
          name: 'cook',
          // User-readable display name for the host. Required.
          hostId: 'cook',
          // Queue type (Bull or Bee - default Bull).
          type: 'bee',  
          redis: {
             host: '127.0.0.1',
            port: REDIS_SERVER_PORT,
          },
        }
      ],
      customCssPath: 'https://example.com/custom-arena-style.css',
      customJsPath: 'https://example.com/custom-arena-js.js'
    }
  );

  module.exports.arenaConfig = arenaConfig;
// main().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });