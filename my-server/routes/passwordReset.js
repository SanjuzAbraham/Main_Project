// const router = require('express').Router();
// const {User} = require('./model/userModel');
// const Token = require('./model/token');
// const crypto = require("crypto");
// const sendEmail = require("./utils/sendEmail");
// const Joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");
// const bcrypt = require("bcrypt");
// const { allowedNodeEnvironmentFlags } = require('process');

// router.post("/", async(req,res)=>{
//     try{
//         const emailSchema = joi.object({
//             email : Joi.string().email().required().label("Email")
//         });
//         const {error} = emailSchema.validate(req.body);
//         if(error)
//             return res.status(400).send({message: error.details.message});

//         let user = await User.findOne({email: req.body.email});
//         if(!user)
//             return res.status(409).send({message: "User with given email doesnot exist"});
        
//         let token = await Token.findOne({userId: user._id});
//         if(!token){
//             token = await new Token({
//                 userId: user._id,
//                 token: crypto.randomBytes(32).toString("hex")
//             }).save()
//         } 
//         const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}`;
//         await sendEmail(user.email,"Password Reset", url);
//         res.status(200).send({message: "Password reset link sent to your email account"});
        
//     }
//     catch(error){
//         res.status(500).send({message: "Internal Server error"});
//     }
// })


// router.get("/:id/:token", async(req,res) => {
//     try{
//         const user = await User.findOne({_id:req.params.id});
//         if(!user)
//             return res.status(400).send({message: "Invalid Link"});
//         const token = await Token.findOne({
//             userId:user._id,
//             token: req.params.token
//         });
//         if(!token)
//             return res.status(400).send({message: "Invalid Link"});
//         res.status(200).send({message: "Valid URL"});
//     }
//     catch(error){
//         res.status(500).send({message: "Internal Server error"});
//     }
// })


// router.post("/:id/:token",  async(req,res) => {
//     try{
//         const passwordSchema = Joi.object({
//             password: passwordComplexity().required().label("Password")
//         });
//         const {error} = passwordSchema.validate(req.body);
//         if(error)
//             return res.status(400).send({message: error.details.message});
//         const user = await User.findOne({_id:req.params.id});
//         if(!user)
//             return res.status(400).send({message: "Invalid Link"});
//         const token = await Token.findOne({
//             userId:user._id,
//             token: req.params.token
//         });
//         if(!token)
//             return res.status(400).send({message: "Invalid Link"});
//         if(!user.verified) user.verified =true;

//         const salt = await bcrypt.genSalt(Number(process.env.SALT));
//         const hashPassword = await bcrypt.hash(req.body.password, salt);

//         user.password = hashPassword;
//         await user.save();
//         await token.remove();

//         res.status(200).send({message: "password reset successfully"});
//     }
//     catch(error){
//         res.status(500).send({message: "Internal Server error"});
//     }
// })


// module.exports = router;