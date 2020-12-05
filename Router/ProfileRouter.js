const express = require("express");
const router = express.Router();
const logger = require("../Utils/LoggerUtil.js");
const authMiddleWare = require("../Middlewares/AuthMiddleWare");
const authenticationService = require("../Service/AuthenticationService");
const profileService = require("../Service/ProfileService");

router.post("/viewProfile", authMiddleWare, (req, res) => {
    let reqDataMap = req.body;
    profileService.getUserData(reqDataMap.user_name , reqDataMap.phone_no).then((response) =>{
        if(response.rowCount === 0){
            return logger.error(req,res,404, {msg:"User Not Found"});
         }
        let userData =  response.rows.pop();
        return logger.response(req,res, {msg:"Data Fetched Successfully",
                   userData});
     }).catch((error) =>{
         return logger.error(req,res,500, {msg:"DB Error"}, error);
     });
});

router.put("/updateProfile", authMiddleWare, async (req, res) => {
    let reqDataMap = req.body;
    let response = await authenticationService.getExistUserData(reqDataMap.user_name , reqDataMap.phone_no);
    if(response.rowCount === 0){
        // retrun if user is not found
        return logger.error(req,res,404, "User Not Found");
    }
    profileService.updateUserData(reqDataMap.user_name , reqDataMap.phone_no, reqDataMap).then(() =>{
        return logger.response(req,res, {msg:"Data Updated Successfully"});
     }).catch((error) =>{
         return logger.error(req,res,500, {msg:"DB Error"}, error);
     });
});

module.exports = router;
