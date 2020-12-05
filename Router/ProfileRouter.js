const express = require("express");
const router = express.Router();
const logger = require("../Utils/LoggerUtil.js");
const authMiddleWare = require("../Middlewares/AuthMiddleWare");
const authenticationService = require("../Service/AuthenticationService");
const profileService = require("../Service/ProfileService");

router.get("/viewProfile", authMiddleWare, (req, res) => {
    let reqDataMap = req.body;
    authenticationService.getExistUserData(reqDataMap.user_name , reqDataMap.phone_no).then((response) =>{
        return logger.response(req,res, {msg:"Data Fetched Successfully",
               rows: response.rows});
     }).catch((error) =>{
         return logger.error(req,res,500, {msg:"DB Error"}, error);
     });
});

router.get("/updateProfile", authMiddleWare, (req, res) => {
    let reqDataMap = req.body;
    profileService.updateUserData(reqDataMap.user_name , reqDataMap.phone_no, reqDataMap).then(() =>{
        return logger.response(req,res, {msg:"Data Updated Successfully"});
     }).catch((error) =>{
         return logger.error(req,res,500, {msg:"DB Error"}, error);
     });
});

module.exports = router;
