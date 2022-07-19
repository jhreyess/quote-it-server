const router = require('express').Router();
const path = require("path");

const session = require("./api/session");
const feed = require("./api/feed");
const me = require("./api/me");

// API routes
router.use("/api/me", me);
router.use("/api/session", session);
router.use("/api/feed", feed);

// If no routes match
router.use("/api/*", (req, res) => {
    return res.status(404).json({success: false, error: "Undefined"});
});

router.use("/*", (req, res) => {
    return res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});

module.exports = router;