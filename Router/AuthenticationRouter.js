const express = require("express");
const router = express.Router();
const otplib = require('otplib');
const mailService = require("../Service/MailService");
const logger = require("../Utils/LoggerUtil.js");
const authMiddleWare = require("../Middlewares/AuthMiddleWare");
const authenticationService = require("../Service/AuthenticationService");

router.post("/register", authMiddleWare, async (req, res) => {
    let reqDataMap = req.body;
    if(!reqDataMap.email_id.includes("@gmail.com")){
        // In future nodemailer is implemented to support all domain 
        return logger.error(req,res,400, {msg : "Try Email With Domain Gmail.Com"});
    }
    let response = await authenticationService.getExistUserData(reqDataMap.user_name , reqDataMap.phone_no);
    if(response.rowCount > 0){
        // return if user already exists
        return logger.error(req,res,409, {msg : "User Already Exists", rows:response.rows});
    }
    authenticationService.insertRegisterUserData(reqDataMap).then(() =>{
       return logger.response(req,res,  {msg:"Data Inserted Successfully"})
    }).catch((error) =>{
        return logger.error(req,res,500, {msg:"DB Error"}, error);
    });
});

router.post("/login", authMiddleWare, (req, res) => {
    let reqDataMap = req.body;
    authenticationService.getLoginUserData(reqDataMap.user_name, reqDataMap.phone_no , reqDataMap.password).then((response) =>{
        return logger.response(req,res, {msg:"Data Fetched Successfully",
               rows: response.rows});
     }).catch((error) =>{
         return logger.error(req,res,500, {msg:"DB Error"}, error);
     });
});

router.post("/forgetPassword", authMiddleWare, async(req, res) => {
    // Future implementation with OAuth
    let reqDataMap = req.body;
    let response = await authenticationService.getExistUserData(reqDataMap.user_name , reqDataMap.phone_no);
    if(response.rowCount === 0){
        // retrun if user is not found
        return logger.error(req,res,404, "User Not Found");
    }
    const secretKey = otplib.authenticator.generateSecret();
    const otp = otplib.authenticator.generate(secretKey);
    let userData = response.rows.pop();
    mailService.sendMail(userData.user_name , userData.email_id , otp).then(() =>{
        // In future need to avoid sending otp to client (instead of this otp table need to manage)
        // Here pursose to send is to only simply task 
        return logger.response(req,res, {msg : "Otp Send To Mail", otp});
     }).catch((error) =>{
         return logger.error(req,res,500, {msg:"DB Error"}, error);
     });
});

router.put("/updatePassword", authMiddleWare, async(req, res) => {
    let reqDataMap = req.body;
    let newPassword = req.body.password;
    let response = await authenticationService.getExistUserData(reqDataMap.user_name , reqDataMap.phone_no);
    if(response.rowCount === 0){
        // retrun if user is not found
        return logger.error(req,res,404, "User Not Found");
    }
    let userData = response.rows.pop();
    authenticationService.updatePassword(userData.user_name , userData.phone_no,  newPassword).then(() =>{
        return logger.response(req,res, {msg : "Password Updated Successfully"});
     }).catch((error) =>{
         return logger.error(req,res,500, {msg:"DB Error"}, error);
     });
});

module.exports = router;
