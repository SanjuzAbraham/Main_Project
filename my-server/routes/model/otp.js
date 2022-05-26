var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var otpSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    code: {
          type: String,
    },
    expireIn: {
          type: Number,
    }
},
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("otp", otpSchema);
 
