const puppeteer = require("puppeteer");

const profileStore = require("data-store")({
  path: process.cwd() + "/data/profile.json"
});

const Profile = require("./models");

async function test(url, browser) {
  try {
    const page = await browser.newPage();
    await page.goto(url);
    const title = await page.title();
    const profileDetails = await page.evaluate(() => {
      const name = document.querySelector(".d-block.overflow-hidden")
        .textContent;

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
    });

    // profileStore.union("profiles", profileDetails);
    const profile = new Profile({
      name: profileDetails.name,
      repos: profileDetails.repos,
      stars: profileDetails.startCount
    });
    await profile.save();

    await page.close();
  } catch (error) {
    await browser.close();
  }
}

module.exports = test;
