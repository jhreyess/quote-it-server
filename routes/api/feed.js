const router = require('express').Router();
const moment = require('moment')

const pg = require('pg-promise')();
const db = require('../../database')
const auth = require('../middlewares/auth')

// CREATE A NEW POST
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
        inserted.creatorActions = true
        return inserted
    })
    .then((post) => { return res.status(200).json({success: true, data: [post]}) } )
    .catch(e => { return res.status(400).json({success: false, error: e}) })

})

// DELETE A POST
router.delete('/:postId', auth, async (req, res) => {

    const post = { 
        id: req.params.postId, 
        userId: req.user.id 
    }
    
    db.task(async t => {
        const toDelete = await t.oneOrNone("SELECT user_id FROM posts WHERE post_id = $1", post.id) 

        if(!toDelete) throw {code: 400, msg: "Resource doesn't exist"}
        if(toDelete.user_id != post.userId) throw {code: 403, msg: "Permission Denied"}

        await t.none("DELETE FROM posts WHERE post_id = $1 AND user_id = $2", [post.id, post.userId])

        return
    })
    .then( () => {return res.status(200).json({success: true})})
    .catch(e => {
        if(e.code && e.msg) { return res.status(e.code).json({success: false, error: e.msg}) }
        return res.status(400).json({success: false, error: "Something went wrong"})
    })        
})


// GET FEED
router.get('/', auth, async (req, res) => {

    try{    
        const exists = pg.as.format("EXISTS(SELECT 1 FROM user_likes WHERE user_likes.post_id = posts.post_id AND user_likes.user_id = $1)", req.user.id)
        const likes = pg.as.format("SELECT COUNT(*) AS no_likes FROM user_likes WHERE user_likes.post_id = posts.post_id")
        const date = moment().subtract(1, 'days').unix()
        const timestamp = pg.as.format("timestamp >= to_timestamp($1)", date)
        const posts = await db.manyOrNone("SELECT *, ($1:raw) AS liked, ($2:raw) FROM posts WHERE $3:raw LIMIT 20", [exists, likes, timestamp])
        posts.forEach(post => {
            post.creatorActions = post.user_id === req.user.id
        })
        return res.status(200).json({success: true, data: posts})
    }catch(e){
        console.log(e)
        return res.status(400).json({success: false, error: "Something went wrong"})
    }
})

// SYNC OFFLINE LIKES
router.post('/sync', auth, async (req, res) => {

    const ids = req.body.values

    if(typeof ids === 'undefined' || ids.length < 1){
        return res.status(200).json({success: false, error: "No values passed"})
    }

    const colset = new pg.helpers.ColumnSet(['post_id', 'user_id'], {table: 'posts'})
    const values = []
    ids.forEach(postId => {
        values.append({'post_id': postId, 'user_id': req.user.id})
    });
    const onConflict = " ON CONFLICT (user_id, post_id) DO NOTHING"
    const query = pg.helpers.insert(values, colset) + onConflict;

    try{
        await db.none(query);
        return res.status(200).json({success: true})
    }catch(e){
        console.log(e)
        return res.status(400).json({success: false, error: "Something went wrong"})
    }
})

// GET NUMBER OF LIKES OF A POST
router.get('/:postId/likes', auth, async (req, res) => {

    try{
        const likes = await db.one("SELECT COUNT(*) FROM user_likes WHERE post_id = $1", [req.params.id])
        return res.status(200).json({success: true, count: likes.count })
    }catch(e){
        console.log(e)
        return res.status(400).json({success: false, error: "Something went wrong"})
    }
})


// LIKE A POST
router.post('/:postId/likes', auth, async (req, res) => {

    const postLike = {
        user_id: req.user.id,
        post_id: req.params.postId
    }
    try{
        await db.none("INSERT INTO user_likes(${this:name}) VALUES(${this:csv}) ON CONFLICT (user_id, post_id) DO NOTHING", postLike)
        return res.status(200).json({success: true})
    }catch(e){
        console.log(e)
        return res.status(400).send({success: false, error: "Something went wrong"})
    }
})

// UN-LIKE A POST
router.delete('/:postId/likes', auth, async (req, res) => {

    const postLike = [req.user.id, req.params.postId] 
    try{
        await db.none("DELETE FROM user_likes WHERE user_id = $1 AND post_id = $2", postLike)
        return res.status(200).json({success: true})
    }catch(e){
        console.log(e)
        return res.status(400).send({success: false, error: "Something went wrong"})
    }
})

module.exports = router;