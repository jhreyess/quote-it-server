const router = require('express').Router();
const path = require('path');
const users = require("./api/users");
const posts = require("./api/posts");

//API routes
router.use("/api/users", users);
// router.use("/api/posts", posts);

//If no API routes match
router.use(function(req, res){
    if(!req.route) { res.status(404)}
    res.sendFile();
});

module.exports = router;