var mongoose = require("mongoose");
var courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    unique:true
  },
  courseName: {
    type: String,
    unique:true
  },
  courseType: {
    type: String,
  },
  courseCategory: {
    type: String,
  },
  courseStartDate: {
    type: String,
  },
  courseEndDate: {
    type: String,
  },
  courseDesc:{
    type:String,
  },
  courseStatus:{
    type:String,
    enum:["active","blocked"],
    default:"active"
  },
  courseVideos:[{
    type: String,
  }],
});
module.exports = mongoose.model("courses", courseSchema);