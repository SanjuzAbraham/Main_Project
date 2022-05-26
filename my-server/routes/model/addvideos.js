var mongoose = require("mongoose");
var videoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    unique:true
  },
  courseName: {
    type: String,
    unique:true
  },
  videoAll: {
    type: String,
  },
});
module.exports = mongoose.model("videos", videoSchema);