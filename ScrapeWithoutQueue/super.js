const puppeteer = require("puppeteer");
const store = require("data-store")({ path: process.cwd() + "/foo.json" });

class Chrome {
  constructor() {
    this.browser;
    this.page;
  }

  async launch() {
    if (!this.browser) {
      console.log("Launching browser...");
      this.browser = await puppeteer.launch({ headless: false });
    }

    if (!this.page) {
      console.log("creating page...");
      this.page = await this.browser.newPage();
    }
  }

  async navigate(url) {
    await this.launch();
    await this.page.goto(url);
  }

  async log(text) {
    console.log(text);
  }

  async click(selector) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
    await this.page.waitForSelector(100);
    await this.page.waitForFunction(() => {
      return window.performance.timing.domComplete;
    });
  }

  async waitFor(selector) {
    await this.page.waitForSelector(selector);
  }

  async close() {
    console.log("Closing browser");
    await this.page.close();
    await this.browser.close();
  }
}

class Github extends Chrome {
  constructor() {
    super();
  }
  async navigateStargazersPage() {
    this.log("Navigating stargazers page...");
    await this.navigate("https://github.com/h5bp/html5-boilerplate/stargazers");
  }

  async collectingUrls() {
    const links = await this.page.evaluate(() => {
      const links = [
        ...document.querySelectorAll(".css-truncate-target a")
      ].map(a => a.href);
      return links;
    });

    store.union('links', links)
  }

  async takeScreenShot() {
    await this.page.screenshot({ path: "test.png" });
  }
}
module.exports = Github;


// (async () => {
//   const github = new Github();
//   await github.navigateStargazersPage();
//   await github.collectingUrls();
// })();
