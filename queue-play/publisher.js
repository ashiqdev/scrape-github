const Queue = require("bull");
const scraperQueue = new Queue("github scraper");

const links = [
  "http://github.com/entraptaher",
  "http://github.com/nsourav",
  "http://github.com/jonaed1230",
  "http://github.com/ashiqdev"
];

for (let link of links) {
  scraperQueue.add({ url: link });
}

// scraperQueue.add({ url: "http://github.com/entraptaher" });
// scraperQueue.add({ url: "http://github.com/nsourav" });
// scraperQueue.add({ url: "http://github.com/jonaed1230" });
// scraperQueue.add({ url: "http://github.com/ashiqdev" });
