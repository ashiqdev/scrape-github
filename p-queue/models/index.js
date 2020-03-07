const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const ProfileSchema = new mongoose.Schema({
  name: String,
  repos: Number,
  stars: Number
});

module.exports = mongoose.model("Profile", ProfileSchema);
