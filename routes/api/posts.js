const router = require('express').Router();
const moment = require('moment')

const pg = require('pg-promise')();
const db = require('../../database')
const auth = require('../middlewares/auth')

router.post('/', auth, async (req, res) => {

    const newPost = {
        user_id: req.user.id,
        quote_author: req.body.quoteAuthor,
        quote_desc: req.body.quoteDesc,
    };    

    db.task(async t => {
        const user = await t.one("SELECT username FROM users WHERE user_id = $1 LIMIT 1", req.user.id)
        newPost.post_by = user.username
        const inserted = await t.one("INSERT INTO posts(${this:name}) VALUES(${this:csv}) RETURNING *", newPost)
        return inserted
    })
    .then((post) => { return res.status(200).json({success: true, data: [post]}) } )
    .catch(e => { return res.status(400).json({success: false, error: e}) })

})

router.delete('/', auth, async (req, res) => {

    const post = [req.user.id, req.body.postId]
    console.log(req.user)
    try{    
        await db.none("DELETE FROM posts WHERE user_id = $1 AND post_id = $2", post)
        return res.status(200).json({success: true})
    }catch(e){
        console.log(e)
        return res.status(400).send()
    }
})

router.get('/', auth, async (req, res) => {

    try{    
        const exists = pg.as.format("EXISTS(SELECT 1 FROM user_likes WHERE user_likes.post_id = posts.post_id)")
        const likes = pg.as.format("SELECT COUNT(*) AS no_likes FROM user_likes WHERE user_likes.user_id = $1", req.user.id)
        const date = moment().subtract(1, 'days').unix()
        const timestamp = pg.as.format("timestamp >= to_timestamp($1)", date)
        const posts = await db.manyOrNone("SELECT *, ($1:raw) AS liked, ($2:raw) FROM posts WHERE $3:raw", [exists, likes, timestamp])
        return res.status(200).send({success: true, data: posts})
    }catch(e){
        console.log(e)
        return res.status(400).send({success: false, error: "Something went wrong"})
    }
})

router.get('/:postId', auth, (req, res) => {
    res.status(202).send()
})

module.exports = router;