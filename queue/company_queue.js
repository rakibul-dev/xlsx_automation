const Redis = require("ioredis");
const Bull = require("bull");

const insertDataToDb = require("../queries/dbExecutables");

const redisOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USER_NAME,
  password: process.env.REDIS_PASSWORD,
};

const redis = new Redis(redisOptions);
// Check the connection status
redis.on("connect", () => {
  console.log("Connected to Redis database.");
});

// Check for errors during connection
redis.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

// Create an instance of the Bull queue
const queue = new Bull("scraper-queue", {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
});

queue.process(async (job) => {
  insertDataToDb(job);
  //   console.log("Process job ====>", job.data);
});

queue.on("error", function (error) {
  console.log(" An error occured.", error);
});

queue.on("waiting", function (jobId) {
  //   console.log(
  //     " // A Job is waiting to be processed as soon as a worker is idling. ==========>",
  //     jobId
  //   );
});

queue.on("active", function (job, jobPromise) {
  // A job has started. You can use `jobPromise.cancel()`` to abort it
  //   console.log("A job has started.========>>>>", job.data);
});

queue.on("stalled", function (job) {
  // workers that crash or pause the event loop.
  console.log(
    " // A job has been marked as stalled. This is useful for debugging job",
    job.data
  );
});

queue.on("lock-extension-failed", function (job, err) {
  // A job failed to extend lock. This will be useful to debug redis
  // connection issues and jobs getting restarted because workers
  // are not able to extend locks.
  console.log("");
});

queue.on("progress", function (job, progress) {
  //
  console.log("A job's progress was updated! ==> ", job.data);
});

queue.on("completed", function (job, result) {
  //   console.log(
  //     " A job successfully completed with a `result`.=============>",
  //     job.data
  //   );
  //   await queue.obliterate();
});

queue.on("failed", function (job, err) {
  console.log(" A job failed with reason `err`!=============>", err, job.data);
});

queue.on("paused", function () {
  // The queue has been paused.
});

queue.on("resumed", function (job) {
  // The queue has been resumed.
});

queue.on("cleaned", function (jobs, type) {
  console.log(
    " Old jobs have been cleaned from the queue. `jobs` is an array of cleaned =============>"
  );
});

queue.on("drained", function () {
  // Emitted every time the queue has processed all the waiting jobs (even if there can be some delayed jobs not yet processed)
});

queue.on("removed", function (job) {
  // A job successfully removed.
});

module.exports = queue;
