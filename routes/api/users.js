const router = require('express').Router();
const bcrypt = require('bcryptjs');

const validateLoginInput = require("../../validations/login");
const validateRegisterInput = require("../../validations/register");
const db = require('../../database')

router.post('/register', (req, res) => {
    console.log("Someone made a request!")
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

    bcrypt.hash(newuser.password, 10, function(err, hash){        
        if(err) throw err;
        newuser.password = hash;
        db.query("INSERT INTO users SET ?", newuser, (err, res, fields) => {
            if(err) throw err
        })
        .then(console.log("user registered"))
        .catch(err => console.log(err));
    })
});

router.post('/login', (req, res) => {

    //Form validation
    const{
        errors,
        isValid
    } = validateLoginInput(req.body);

    //If errors return a bad response
    if(!isValid){return res.status(400).json({success: false, error: errors})}

    //if no errors 

    //MySQL find user - if not return 404
    User.findOne({
        email: req.body.email
    }).then(user=>{

        if(!user){
            return res.status(404).json({
                success: false,
                error: "Email not found"
            });
        }

        //Compare password
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