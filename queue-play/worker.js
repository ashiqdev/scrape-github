const Queue = require("bull");
const scraperQueue = new Queue("github scraper");

// SANDBOX
scraperQueue.process(5, __dirname + `/process.js`);
