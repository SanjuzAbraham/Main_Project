var mongoose = require("mongoose");
var enrolledCourseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref:"users"
  },
  courseUniqueId: {
    type: mongoose.Types.ObjectId,
    ref:"courses"
  },
  userName: {
      type: String,
  },
  courseId: {
    type: String,
  },
  courseName: {
    type: String,
  },
  
});
module.exports = mongoose.model("Enrolled", enrolledCourseSchema);