const express=require("express");
const app=express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("./passport-setup");
require("dotenv").config();
//import multiple page routes
const routes = require("./routes/rootRouters");
const PORT = process.env.PORT || 3000;

/*const checkAuthentication = (req,res,next)=>{
    const token = req.headers.authorization;
    if (token){
        jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
            if (err){next(err);}
            res.send("You made it!");  
        })
    } else {
        res.status(403).send("You are not authorized");
    }
}*/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
/*
    SPA - use this

    use local mongoose/mongodb

    user has:
    name
    email
    birthday
    password
    photo

    According to documentation, the profile parameter will have access to FB profile data-some of this can be saved into the
    db. Otherwise, include default account creation with FB account login as an optional feature

    For now, this app will use jwt. FB oauth will be added afterwards

    focus on getting login/registration to work (later get FB sign-in to work)
    once both of these are okay, build out the posting, comments, friend requests, etc

    refs:
    posts made (post, put, delete)
    comments made (post, put, delete)
    likes given (post)
    likes received (get)
    friend requests sent (post, delete)
    friend requests received (get, post(accept + new friend),delete)-should involved adding users to friends in User object
    friendship (mutual) (get, delete, possibly put-if blocked)
    notification??
    messages??

    default screen is login/register page
    if logged in, it's newsfeed + user profile info (ie friend requests)
    every route then should have an authentication middleware to check
*/
app.use("/", passport.authenticate("jwt", {session: false}), routes);

//error handlers
app.use((req,res,next)=>{
    let err = new Error;
    err.status = 404;
    next(err);
});

app.use((err,req,res,next)=>{
    return res.send({
        message: err.message || "Internal Server Error",
        status: err.status || 500
    });
})

app.listen(PORT, ()=>console.log(`App is running on port ${PORT}`));