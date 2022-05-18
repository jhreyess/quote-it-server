const router = require('express').Router();
const auth = require('../middlewares/auth')
const db = require('../../database')

router.get('/feed', auth, async (req, res) => {
    try{
        const userPosts = await db.manyOrNone("SELECT * FROM posts WHERE user_id = $1", req.user.id)
        return res.status(200).json({success: true, data: userPosts})
    }catch(e){
        return res.status(400).json({success: false})
    }
})

module.exports = router;