var mongoose = require("mongoose");
var tcourseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    unique:true
  },
  courseName: {
    type: String,
    unique:true
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
    type: String,
  },
  courseAmount: {
    type: Number,
  },
  courseStatus:{
    type:String,
    enum:["active","blocked"],
    default:"active"
  },
  courseVideos:[{
    type: String,
  }],
  // coursePdf:{
  //   type : String,
  // }
});
module.exports = mongoose.model("paidcourses", tcourseSchema);