const delay = require("yoctodelay");

module.exports = (job, done) => {
  console.log(`scraping ${job.data.url}`);

  delay(2000).then(() => {
    console.log(`scraping finished`);
    done();
  });
};
