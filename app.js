const express=require("express");
const app=express();
const cors = require("cors");
//import multiple page routes
const routes;

app.use(express.json());
app.use(express.urlencoded());
/*
    SPA-yes, use this

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
    friend requests received (get, post(accept + new friend),delete)
    friendship (mutual) (get, delete, possibly put-if blocked)
    notification??
    messages??

    default screen is login/register page
    if logged in, it's newsfeed + user profile info (ie friend requests)
    every route then should have an authentication middleware to check
*/
app.use("/", passport.authenticate("jwt", {session: false}), routes);

app.listen();