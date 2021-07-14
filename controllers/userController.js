const bcrypt = require("bcrypt");
const {check, validationResult} = require("express-validator");
const User = require("../models/user");
const passport = require("../passport");
const jwt = require("jsonwebtoken");

//import models as needed
//import passport modules


exports.register_post = [
    //check fields
    check("name").trim().escape().isLength({max: 30}),
    check("email").trim().escape().isEmail().withMessage("This field must be a valid email."),
    check("password").trim().escape(),
    check("password2").trim().escape().custom((value, {req})=>{
        if (req.body.password!==val){
            throw new Error("Passwords don't match!");
        } else {
            return true;
        }
    }),
    check("birthday").trim().escape(),
    (req,res,next)=>{
        let {name, email, password, birthday} = req.body;
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).send({errors: errors.array()});
        } else {
            User.findOne({email: req.body.email}).exec((err, results)=>{
                if (err){next(err);}
                if (results){
                    return res.json(results);
                } else {
                    bcrypt.hash(password,10, (err, hashedPass)=>{
                        if (err){next(err);}
                        let newUser = new User({ name, email, password: hashedPass, birthday });
                        newUser.save().then(data=>res.status(200).json(data))
                        .catch(err=>{
                            errors = errors.array();
                            errors.push(err);
                            return res.status(500).send(errors);
                        });
                    });                    
                }
            });
        }

}];

exports.login_post = (req,res,next)=>{
    passport.authenticate("local",{session: false},(err,user,info)=>{
       if (err || !user){
           return res.status(400).json({
               message: info.message,
               user: user
           });
       }
       req.login(user, {session: false}, (err)=>{
            if (err){
                res.send(err);
            }

           const token = jwt.sign({user},SECRET_CODE);
           return res.json({user, token});
       });       

    })(req,res);
};

exports.logout_get = (req,res,next)=>{
    req.logout();
    res.send("Logged out.");
}

