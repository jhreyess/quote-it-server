const router = require('express').Router();

const session = require("./api/session");
const feed = require("./api/feed");
const me = require("./api/me")

//API routes
router.use("/api/me", me)
router.use("/api/session", session);
router.use("/api/feed", feed);

//If no API routes match
router.use(function(req, res){
    return res.status(404).json({success: false, error: "Undefined"})
});

module.exports = router;