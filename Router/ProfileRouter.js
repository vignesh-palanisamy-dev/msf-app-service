const express = require("express");
const router = express.Router();
const logger = require("../Utils/LoggerUtil.js");
const authMiddleWare = require("../Middlewares/AuthMiddleWare");

router.get("/viewProfile", authMiddleWare, (req, res) => {
    console.log(req.body);
});

router.get("/updateProfile", authMiddleWare, (req, res) => {
    console.log(req.body);
});

module.exports = router;
