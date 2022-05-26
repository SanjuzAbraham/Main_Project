var express = require("express");
const nodemailer = require('nodemailer');
const cors = require('cors');
var router = express.Router();
var courses = require("./model/addcourse");
var users = require("./model/userModel");
var Enrolled = require("./model/enrolledcourses");
var tcourses = require("./model/teacherCourse");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var Otp = require("./model/otp");
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
const multer = require('multer');
const { google } = require('googleapis');


 
const app = express();
 
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();




/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Sanju" });
});

router.post("/register", async (req, res, next) => {
  
  var user = new users({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    role:req.body.role,
  });
  var response = await user.save();
  
  if (response) {
    res.status(200).json({ message: "success" });
  } else {
    res.status(401).json({ status: "failed" });
  }
});
router.post("/login", async (req, res, next) => {
  try {
    //validation
    if (!req.body.email || !req.body.password)
      return res.status(400).json({
        status: false,
        message: "Validation Failed",
      });

    const user = await users.findOne({
      email: req.body.email,
    });

    if (user.status === "active") {
      console.log(user);
      if (!user)
        return res.status(404).json({
          status: false,
          message: "User does not exist",
        });
      const pwdMatch = await bcrypt.compare(req.body.password, user.password);

      if (!pwdMatch)
        return res.status(401).json({
          status: false,
          message: "Password Incorrect",
        });

      const token = jwt.sign(
        { userid: user._id, email: user.email },
        process.env.SECRET_CODE,
        { expiresIn: "1d" }
      );
      res.status(200).send({
        token: token,
        username: user.fullname,
        email:user.email,
        role: user.role,
        id: user._id,
      });
    } else {
      return res.status(500).send({
        message: "User Denied",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      data: err,
    });
  }
});
router.get("/getcourses", async (req, res) => {
  await courses
    .find()
    .exec()
    .then((response) => {
      console.log(response);
      if (response) {
        res.status(200).json({ courses: response });
      } else {
        res.status(401).json({ status: "failed" });
      }
    });
});
router.post("/getcoursebyId", async (req, res) => {
  await courses
    .findById(req.body.id)
    .exec()
    .then((response) => {
      console.log(response);
      if (response) {
        res.status(200).json({ courses: response });
      } else {
        res.status(401).json({ status: "failed" });
      }
    });
});
router.post("/myCourses", async (req, res) => {
  let id = req.body.id;
  await Enrolled.find({ userId: id })
    .exec()
    .then((response) => {
      console.log(response);
      if (response) {
        res.status(200).json({ courses: response });
      } else {
        res.status(401).json({ status: "failed" });
      }
    });
});
router.post("/paidCourse", async (req, res) => {
  newPayment = new Enrolled({
    courseUniqueId : req.body.courseUniqueId,
    userId : req.body.userId,
    userName : req.body.userName,
    courseId : req.body.courseId,
    courseName : req.body.courseName,
  })

  await newPayment.save(function (err){
    if(err){
      console.log(err);
      res.status(401).json({ status: "failed" });
    }
    else{
      res.status(200).json({ paymentStatus: 'success'  });
    }
  })
});
router.get("/getStudents", async (req, res) => {
  await users
    .find({ role: "student" })
    .exec()
    .then((response) => {
      console.log(response);
      if (response) {
        res.status(200).json({ users: response });
      } else {
        res.status(401).json({ status: "failed" });
      }
    });
});

// router.post("/addcourse", async (req, res, next) => {
//  console.log("dawdasd", req.body.cenddate,);
//   var course = new courses({
//     courseId: req.body.cid,
//     courseName: req.body.cname,
//     courseType: req.body.ctype,
//     courseCategory: req.body.ccategory,
//     courseStartDate: req.body.cstartdate,
//     courseEndDate: req.body.cenddate,
//     courseDesc:req.body.cdesc,
//     courseLinkVideo : req.body.clinkvideo,
//   });
//   var response = await course.save();
//   console.log(response);
//   if (response) {
//     res.status(200).json({ response });
//   } else {
//     res.status(401).json({ status: "failed" });
//   }
// });

router.post("/addcourse", async (req, res, next) => {
  let imgArr = [];

  if (req.files) {
    let coverImage = req.files.VideoLink;
    coverImage.forEach((cover) => {
      let coverName = Date.now();
      cover.mv(
        "C:/Users/Futurense/Desktop/MINI_NEW/my-server/routes/videos/" +
          coverName +
          ".mp4"
      );
      imgArr.push(coverName + ".mp4");
    });
  }

  let Courses = new courses({
    courseId: req.body.cid,
    courseName: req.body.cname,
    courseType: req.body.ctype,
    courseCategory: req.body.ccategory,
    courseStartDate: req.body.cstartdate,
    courseEndDate: req.body.cenddate,
    courseDesc: req.body.cdesc,
    courseVideos: imgArr,
  });

  console.log("My" + Courses);

  Courses.save()
    .then((courses) => {
      return res.status(200).send({
        message: courses,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});

//Deactivate course
router.post("/deleteCourse", async (req, res, next) => {
  let courseID = req.body.courseID;
  let Status = {
    courseStatus: "blocked",
  };
  courses
    .findByIdAndUpdate(courseID, { $set: Status })
    .then((user) => {
      return res.status(200).send({
        message: "Course Removed",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});
//delete user
router.post("/deleteUser", async (req, res, next) => {
  let userID = req.body.userID;
  users
    .findByIdAndDelete(userID)
    .then((user) => {
      return res.status(200).send({
        message: "User Deleted Successfully",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});
//block user
router.post("/blockUser", async (req, res, next) => {
  let userID = req.body.userID;
  let userStatus = {
    status: "inactive",
  };
  users
    .findByIdAndUpdate(userID, { $set: userStatus })
    .then((user) => {
      return res.status(200).send({
        message: "User Blocked",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});
//Reactivate a User
router.post("/activateUser", async (req, res, next) => {
  let userID = req.body.userID;
  let userStatus = {
    status: "active",
  };
  users
    .findByIdAndUpdate(userID, { $set: userStatus })
    .then((user) => {
      return res.status(200).send({
        message: "User ReActivated",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});

router.post("/updateCourse", async (req, res, next) => {
  let CourseID = req.body.courseID;

  let CourseUpdated = {
    courseName: req.body.cname,
    courseType: req.body.ctype,
    courseCategory: req.body.ccategory,
    courseStartDate: req.body.cstartdate,
    courseEndDate: req.body.cenddate,
    courseDesc: req.body.cdesc,
    courseLinkVideo: req.body.clinkvideo,
  };
  await courses
    .findByIdAndUpdate(CourseID, CourseUpdated, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
    .then((response) => {
      console.log("res", response);
      return res.status(200).send({
        message: "Course Updated",
      });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).send({
        message: error.message,
      });
    });
});
router.post("/addenrolledcourses", async (req, res, next) => {
  var enrolled = new Enrolled({
    userId: req.body.uid,
    courseUniqueId:req.body.unid,
    userName: req.body.uname,
    courseId: req.body.cid,
    courseName: req.body.cname,
  });
  var response = await enrolled.save();
  //console.log(response);
  if (response) {
    res.status(200).json({ response });
  } else {
    res.status(401).json({ status: "failed" });
  }
});

router.post("/sendEmail", async (req, res, next) => {
  const email = req.body.email;
  let data = await users.findOne({
    email: req.body.email,
  });
  const responseType = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      email: req.body.email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpData.save();
    let emailMessage="<h1>Your OTP is</h1> <h3>"+otpcode+"</h3>"
    const CLIENT_ID = '756509888744-4rcaerm14bk68vb3e4hhalt8gd6e0u3l.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04DCh5SKw7g8cCgYIARAAGAQSNwF-L9Ir220Iw3-Jz2MYM2GKsQJ8ETItsWSI4GIu9apcLlR51eeFNOJQxrZ4IoOV2jAa9xkVJf0';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'sanjuabraham321@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Courses4U Admin <sanjuabraham321@gmail.com>',
      to: String(email),
      subject: 'OTP for Reset Password',
      text: 'OTP for Reset Password',
      html: emailMessage,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));
    responseType.statusText = "success";
    responseType.message = "Please check your email id";
  } else {
    responseType.statusText = "error";
    responseType.message = "Email id not exist";
  }
  res.status(200).json(responseType);
});

router.post("/changepass", async (req, res, next) => {
  let data = await Otp.find({ email: req.body.email, code: req.body.otpcode });
  const response = {};
  let myotp = req.body.otpcode;
  let usern = await Otp.findOne({ email: req.body.email });
  console.log(myotp)
  console.log(usern.code)
  if (myotp == usern.code) {
    if (data) {
      let currentTime = new Date().getTime();
      let diff = data.expireIn - currentTime;
      if (diff < 0) {
        response.message = "Timed out";
        response.statusText = "error";
      } else {
        let user = await users.findOne({ email: req.body.email });
        user.password = req.body.password;
        user.save();
        response.message = "Password Changed Successfully";
        response.statusText = "success";
        console.log(response.data);
      }
    } else {
      response.message = "Invalid Otp";
      response.statusText = "error";
    }
  }
  else{
    response.message = "INVALID OTP"
    response.statusText = "error";
  }
  console.log(response.data)
  res.status(200).json(response);
});



// const mailer = (email, otp) => {
//   var nodemailer = require("nodemailer");
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "sanjuabraham321@gmail.com",
//       pass: "Sanjusanju@143",
//     },
//   });
//   var mailOptions = {
//     from: "sanjuabraham321@gmail.com",
//     to: "sanju@gmail.com",
//     subject: "Password Reset",
//     text: "Thank you",
//   };
//   transporter.sendEmail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email Sent: " + info.response);
//     }
//   });
// };


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//   cb(null, 'images') ;
//   },
//   filename: function(req, file, cb) {
//   cb(null, Date.now() + '-' + '-' + file.originalname ) ;
//   }
// });

// const upload = multer({storage}).array('file');


//add paid course
router.post("/addpaidcourse", async (req, res, next) => {


  // const newpath = __dirname + "/files/";
  // const file = req.files.file;
  // const filename = file.name;
 
  // file.mv(`${newpath}${filename}`, (err) => {
  //   if (err) {
  //     res.status(500).send({ message: "File upload failed", code: 200 });
  //   }
  //   res.status(200).send({ message: "File Uploaded", code: 200 });
  // });
  
  

  let imgArr = [];

  if (req.files) {
    let coverImage = req.files.VideoLink;
    coverImage.forEach((cover) => {
      let coverName = Date.now();
      cover.mv(
        "C:/Users/Futurense/Desktop/MINI_NEW/my-server/routes/videos/" +
          coverName +
          ".mp4"
      );
      imgArr.push(coverName + ".mp4");
    });
  }



  let Tcourses = new tcourses({
    courseId: req.body.cid,
    courseName: req.body.cname,
    courseCategory: req.body.ccategory,
    courseStartDate: req.body.cstartdate,
    courseEndDate: req.body.cenddate,
    courseAmount:req.body.camt,
    courseDesc: req.body.cdesc,
    courseVideos: imgArr,
  });
  console.log(req.body)

  Tcourses.save()
    .then((tcourses) => {
      return res.status(200).send({
        message: tcourses,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
    // upload(req, res, (err) =>{
    //   if(err){
    //     return res.status(500).json(err)
    //   }
    //   else{
    //     return res.status(200).send(req.file)
    //   }
    // })
});

//get paid courses
router.get("/getpaidcourses", async (req, res) => {
  await tcourses
    .find()
    .exec()
    .then((response) => {
      console.log(response);
      if (response) {
        res.status(200).json({ tcourses: response });
      } else {
        res.status(401).json({ status: "failed" });
      }
    });
});
//get paid courses user
router.post("/userGetpaidcourses", async (req, res) => {
  await Enrolled
    .find({userId:req.body.uid})
    .exec()
    .then((response) => {
      console.log(response);
      if (response) {
        console.log(response);
        res.status(200).json({ paidcourses: response });
      } else {
        res.status(401).json({ status: "failed" });
      }
    });
});

//update paid course
router.post("/updatePaidCourse", async (req, res, next) => {
  let CourseID = req.body.courseID;

  let CourseUpdated = {
    courseName: req.body.cname,
    courseAmount: req.body.camt,
    courseCategory: req.body.ccategory,
    courseStartDate: req.body.cstartdate,
    courseEndDate: req.body.cenddate,
    courseDesc: req.body.cdesc,
    courseLinkVideo: req.body.clinkvideo,
  };
  await tcourses
    .findByIdAndUpdate(CourseID, CourseUpdated, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
    .then((response) => {
      console.log("res", response);
      return res.status(200).send({
        message: "Course Updated",
      });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).send({
        message: error.message,
      });
    });
});

//get paid courses
router.get("/getpaidcourses", async (req, res) => {
  await tcourses
    .find()
    .exec()
    .then((response) => {
      console.log(response);
      if (response) {
        res.status(200).json({ tcourses: response });
      } else {
        res.status(401).json({ status: "failed" });
      }
    });
});

//get course video
router.post("/getcoursevideo", async (req, res) => {
  let id = req.body.cid;
  await courses.find({ _id: id })
    .exec()
    .then((response) => {
      console.log(response);
      if (response) {
        res.status(200).json({ courses: response });
      } else {
        res.status(401).json({ status: "failed" });
      }
    });
});

router.post("/getpaidcoursevideo", async (req, res) => {
  let id = req.body.cid;
  await tcourses.find({ _id: id })
    .exec()
    .then((response) => {
      console.log(response);
      if (response) {
        res.status(200).json({ courses: response });
      } else {
        res.status(401).json({ status: "failed" });
      }
    });
});
module.exports = router;
