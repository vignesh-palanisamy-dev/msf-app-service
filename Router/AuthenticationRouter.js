const express = require("express");
const router = express.Router();
const logger = require("../Utils/LoggerUtil.js");
const authMiddleWare = require("../Middlewares/AuthMiddleWare");

router.put("/register", authMiddleWare, (req, res) => {
    console.log(req.body);
});

router.post("/login", authMiddleWare, (req, res) => {
    console.log(req.body);
});

router.put("/forgetPassword", authMiddleWare, (req, res) => {
    console.log(req.body);
});

module.exports = router;
