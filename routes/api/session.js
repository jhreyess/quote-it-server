const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const auth = require('../middlewares/auth')

const validateLoginInput = require("../../validations/login");
const validateRegisterInput = require("../../validations/register");
const db = require('../../database')


router.post('/register', async (req, res) => {
    
    // Form validation
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);
    
    // Check validation
    if (!isValid) { return res.status(400).json({success: false, error: errors});}

    //if no errors
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };

    // Check if user already exists
    try{
        const duplicated = await db.oneOrNone("SELECT * FROM users WHERE (email) = $1 OR (username) = $2 LIMIT 1", [newUser.email, newUser.username])
        if(duplicated){ 
            if(duplicated.email === newUser.email){
                return res.status(409).json({success: false, error: "This email already exists"})
            }else if(duplicated.username === newUser.username){
                return res.status(409).json({success: false, error: "This username is already taken"})
            }
        }

        // If no exists
        newUser.password = await bcrypt.hash(newUser.password, 10)
        const createdUser = await db.one("INSERT INTO users(${this:name}) VALUES(${this:csv}) RETURNING *", newUser)

        // Create token
        const token = jwt.sign({ 
            id: createdUser.user_id, 
            email: createdUser.email 
        }, process.env.TOKEN_KEY,
        {
            expiresIn: '24h',
        });
        
        const response = {
            success: true,
            username: createdUser.username,
            userId: createdUser.user_id,
            token: token
        }

        return res.status(200).json(response)
    }catch(e){
        console.log(e)
        return res.status(400).json({success: false, error: "Something went wrong"})
    }
});

router.post('/login', async (req, res) => {
    
    // Form validation
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);
    
    // If errors return a bad response
    if(!isValid){ return res.status(400).json({success: false, error: errors}) }

    // if no errors 
    try{
        const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1 LIMIT 1", req.body.email)

        if(user){
            // Create token
            const token = jwt.sign({ 
                id: user.user_id, 
                email: user.email 
            }, process.env.TOKEN_KEY,
            {
                expiresIn: '24h',
            });
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(validPassword) {
                const response = {
                    success: true,
                    username: user.username,
                    userId: user.user_id,
                    token: token
                }
                return res.status(200).json(response)
            }

        }
        return res.status(401).json({success: false, error: "Email or password incorrect"})
    }catch(e){
        return res.status(400).json({success: false, error: "Something went wrong"})
    }
});

router.post('/password', auth, async (req, res) => {
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await db.none("UPDATE users SET password = $1 WHERE user_id = $2", [newPassword, req.user.id])
        return res.status(200).json({success: true})
    }catch(e){
        console.log(e)
        return res.status(400).json({success: false, error: "Something went wrong"})
    }
})

module.exports = router;