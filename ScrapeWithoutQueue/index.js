const Github = require("./super");

const linkStore = require("data-store")({
  path: process.cwd() + "/data/links.json"
});

const profileStore = require("data-store")({
  path: process.cwd() + "/data/profile.json"
});

const Queue = require("bull");
const scraperQueue = new Queue("github scraper");

class Personal extends Github {
  constructor(links) {
    super();
    this.links = links;
  }

  async naviageAndScrape() {
    this.log("naviagating single profile...");
    for (let link of this.links) {
      try {
        scraperQueue.add({ link });
        await this.scrapeActualData(link);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async scrapeActualData(link) {
    await this.navigate(link);
    await this.log("extracting public profile...");
    const profiledetails = await this.page.evaluate(this.getDetails);
    profileStore.union("profile", profiledetails);
  }

  async getDetails() {
    const name = document.querySelector(".d-block.overflow-hidden").textContent;

    const array = document
      .querySelector(".selected+ .mr-lg-3")
      .textContent.trim("")
      .split("");
    const repoCount = array[array.length - 1];

    const starArray = document
      .querySelector("#js-pjax-container .mr-lg-3:nth-child(4)")
      .textContent.trim("")
      .split("");
    const starCount = starArray[starArray.length - 1];

    return {
      name,
      repos: repoCount,
      stars: starCount
    };
  }
}

(async () => {
  const links = linkStore.get("links") || [];
  const personal = new Personal(links);
  await personal.naviageAndScrape();
  await personal.close();
})();
