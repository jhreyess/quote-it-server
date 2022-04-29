const router = require('express').Router();
const bcrypt = require('bcryptjs');

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
    const findUser = (email, username) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE (email) = ? OR (username) = ? LIMIT 1", [email, username], (err, result) => {
                if(err) return reject({status: 500, success: false, error: err})
                resolve(result[0])
            })
        })
    }

    try{
        const duplicated = await findUser(newUser.email, newUser.username)
        if(duplicated){ 
            if(duplicated.email === newUser.email){
                return res.status(400).json({success: false, error: "This email already exists"})
            }else if(duplicated.username === newUser.username){
                return res.status(400).json({success: false, error: "This username is already taken"})
            }
        }

        // If no exists
        newUser.password = await bcrypt.hash(newUser.password, 10)
        db.query("INSERT INTO users SET ?", newUser, () => {
            return res.status(200).json({success: true})
        })
    }catch(e){
        return res.status(e.status).json({success: e.success, error: e.error})
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

    const findUserByEmail = (email) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE (email) = ? LIMIT 1", [email], (err, result) => {
                if(err) return reject({status: 500, success: false, error: err})
                resolve(result[0])                
            });
        })
    }

    const compareUserPassword = (first, second) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(first, second, (err, valid) => {
                if(err) return reject({status: 500, success: false, error: err})
                resolve(valid)
            })
        })
    }

    // if no errors 
    try{
        const user = await findUserByEmail(req.body.email)
        if(user){
            const validPassword = await compareUserPassword(req.body.password, user.password)
            if(validPassword) return res.status(200).json({success: true})
        }
        return res.status(401).json({success: false, error: "Email or password incorrect"})
    }catch(e){
        return res.status(e.status).json({success: e.success, error: e.error})
    }
});

module.exports = router;