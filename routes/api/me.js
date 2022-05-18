const router = require('express').Router();
const auth = require('../middlewares/auth')

const pg = require('pg-promise')();
const db = require('../../database')

// GET USER FEED
router.get('/feed', auth, async (req, res) => {
    try{
        const exists = pg.as.format("EXISTS(SELECT 1 FROM user_likes WHERE user_likes.post_id = posts.post_id AND user_likes.user_id = $1)", req.user.id)
        const likes = pg.as.format("SELECT COUNT(*) AS no_likes FROM user_likes WHERE user_likes.post_id = posts.post_id")
        const userPosts = await db.manyOrNone("SELECT *, ($1:raw) AS liked, ($2:raw) FROM posts WHERE user_id = $3", [exists, likes, req.user.id])
        return res.status(200).json({success: true, data: userPosts})
    }catch(e){
        console.log(e)
        return res.status(400).json({success: false, error: "Something went wrong"})
    }
})

// GET USER LIKED POSTS
router.get('/likes', auth, async (req, res) => {
    try{
        const exists = pg.as.format("EXISTS(SELECT 1 FROM user_likes WHERE user_likes.post_id = posts.post_id AND user_likes.user_id = $1)", req.user.id)
        const likes = pg.as.format("SELECT COUNT(*) AS no_likes FROM user_likes WHERE user_likes.post_id = posts.post_id")
        const likedPosts = await db.manyOrNone("SELECT *, ($1:raw) FROM posts WHERE ($2:raw)", [likes, exists])
        likedPosts.forEach(post => {
            post.liked = true
        });
        return res.status(200).json({success: true, data: likedPosts})
    }catch(e){
        console.log(e)
        return res.status(400).json({success: false, error: "Something went wrong"})
    }
})

module.exports = router;