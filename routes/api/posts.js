const router = require('express').Router();
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
        await db.one("DELETE FROM posts WHERE user_id = $1 AND post_id = $2 RETURNING *", post)
        return res.status(200).send()
    }catch(e){
        console.log(e)
        return res.status(400).send()
    }
})

router.get('/', auth, async (req, res) => {

    try{    
        const posts = await db.many("SELECT * FROM posts")
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