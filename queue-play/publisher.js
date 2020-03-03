const Queue = require("bull");
const scraperQueue = new Queue("github scraper");

scraperQueue.add({ url: "http://github.com/entraptaher" });
scraperQueue.add({ url: "http://github.com/nsourav" });
scraperQueue.add({ url: "http://github.com/jonaed1230" });
scraperQueue.add({ url: "http://github.com/ashiqdev" });
