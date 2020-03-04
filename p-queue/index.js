const puppeteer = require("puppeteer");
const store = require("data-store")({ path: process.cwd() + "/data/foo.json" });
// const profileStore = require("data-store")({
//   path: process.cwd() + "/data/profile.json"
// });

// const myQueue = new Queue("test it");
const { default: PQueue } = require("p-queue");

const queue = new PQueue({ concurrency: 3 });

const tester = require("./scraper");

const links = store.get("links");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  return Promise.all(
    links.map(async link => {
      return queue.add(() => tester(link, browser));
    })
  );
})(links);
