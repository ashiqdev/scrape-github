const puppeteer = require("puppeteer");
const store = require("data-store")({ path: process.cwd() + "/data/foo.json" });
const mongoose = require("mongoose");
const { default: PQueue } = require("p-queue");

const queue = new PQueue({ concurrency: 3 });

const tester = require("./scraper");


const links = store.get("links");

// mongodb+srv://ashik:<password>@cluster0-qrpjc.mongodb.net/test?retryWrites=true&w=majority
(async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0-qrpjc.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  );
  const browser = await puppeteer.launch({ headless: false });
  return Promise.all(
    links.map(async link => {
      return queue.add(() => tester(link, browser));
    })
  );
})(links);
