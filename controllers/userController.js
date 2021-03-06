const {check, validationResult} = require("express-validator");
const User = require("../models/").User;
const bcrypt = require("bcrypt");
const passport = require("../passport-setup");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//import models as needed

exports.register_post = [
    //check fields
    check("firstName").trim().escape().isLength({max: 17}),
    check("lastName").trim().escape().isLength({max: 17}),
    check("email").trim().escape().isEmail().withMessage("This field must be a valid email."),
    check("password").trim().escape(),
    check("password2").trim().escape().custom((value, {req})=>{
        if (req.body.password!==value){
            throw new Error("Passwords don't match!");
        } else {
            return true;
        }
    }),
    check("birthday").trim().escape(),
    (req,res,next)=>{
        let {firstName, lastName, email, password, birthday} = req.body;
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
                        let newUser =new User({
                            firstName,
                            lastName, 
                            email, 
                            password: hashedPass, 
                            birthday });
                        if (newUser.password !== hashedPass) {
                            let passwordError = new Error("Please try changing your password later");
                            next(passwordError);
                        }
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
               message: info.message || "There was a problem logging in.",
               user
           });
       }
       req.login(user, {session: false}, (err)=>{
            if (err){
                res.send(err);
            }
            //potentially the user here can simply be user, not {user}. If so
            //then you can change the passport strategy to select jwtPayload._id
           const token = jwt.sign({user},process.env.SECRET_CODE);
           return res.json({user, token});
       });       

    })(req,res);
};

exports.logout_get = (req,res,next)=>{
    req.logout();
    res.send("Logged out.");
}

exports.user_get = (req,res,next)=>{
    //populate with various refs (some friends, some posts, and a comment of each post)
    //by "some": only 8-10 limit.
    
    //For posts, more will be loaded as the user scrolls down-should go in post controller

    //all comments of a post will be loaded if the individual post is clicked on-should go in comment controller
    User.findById(req.params.id).exec((err, userData)=>{
        if(err){next(err);}

        return res.json(userData);
    });
}

exports.users_get = async (req,res,next)=>{
    let users;
    try {
        users = await User.find({_id: {$ne: req.user.id}});
        return res.json(users);
    } catch(e){
        next(e);
    }
   
}

//controllers for editing user data (ie edit password-make sure to bcrypt hash it)