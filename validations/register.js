const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data){

    let errors = {};

    //This will convert null fields into empty strings
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Email
    if(validator.isEmpty(data.email)){
        errors.email = "Email field required";
    }else if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    //Username
    if(validator.isEmpty(data.username)){
        errors.username = "Username field required";
    }

    //Password
    if(validator.isEmpty(data.password)){
        errors.password = "Password field required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}