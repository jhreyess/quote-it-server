const router = require('express').Router();
const bcrypt = require('bcryptjs');

const validateLoginInput = require("../../validations/login");
const validateRegisterInput = require("../../validations/register");
const db = require('../../database')

router.post('/register', (req, res) => {
    console.log("[server] Someone trying to register")
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);
    
    // Check validation
    if (!isValid) {return res.status(400).json({success: false, error: errors});}

    //if no errors
    const newuser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };

    // Check if user already exists
    db.query("SELECT * FROM users WHERE (email) = ? OR (username) = ? LIMIT 1", (newuser.email, newuser.username), (err, result, fields) => {
        if(err) throw err
        var duplicated = result[0]

        if(duplicated){
            
            // If email matches
            if(duplicated.email === newuser.email){
                return res.status(400).json({success: false, error: "This email already exists"})
            // Username matches
            }else if(duplicated.username === newuser.username){
                return res.status(400).json({success: false, error: "This username is already taken"})
            }
        }

        // If no duplicated
        bcrypt.hash(newuser.password, 10, function(err, hash){        
            if(err) throw err;
            newuser.password = hash;
            db.query("INSERT INTO users SET ?", newuser, (err, res, fields) => {
                if(err) throw err
            })
            .then(console.log("[server] User registered"))
            .catch(err => console.log(err));
        })
    })
});

router.post('/login', (req, res) => {
    console.log("[server] Someone trying to login")
    // Form validation
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    // If errors return a bad response
    if(!isValid){return res.status(400).json({success: false, error: errors})}

    // if no errors 

    // MySQL find user - if not return 404
    db.query("SELECT * FROM users WHERE (email) = ? LIMIT 1", req.body.email, (err, result, fields) => {
        
        if(err) throw err
        var user = result[0]
        if(!user){
            return res.status(404).json({
                success: false,
                error: "Email not found"
            });
        }

        // Compare password
        bcrypt.compare(req.body.password, user.password, function(err, isValid){
            if(err) throw err;
            if(isValid){
                return res.json({success: true}); //OK
            }else{
                return res.status(401).json({success: false, error: "Email or password incorrect"});
            }
        });

    });

});

module.exports = router;