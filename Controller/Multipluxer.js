const express = require("express");
const router = express.Router();

// import routes
const authenticationRouter = require("../Router/AuthenticationRouter");
const profileRouter = require("../Router/ProfileRouter");

// handle register, login and reset password
router.use(authenticationRouter);

// handle profile view and profile edit
router.use(profileRouter);

// General test purpose to confirm server is live
router.get("/ping", (req, res) => {
    res.send("pong");
});

module.exports = router;
