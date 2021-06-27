const express=require("express");
const app=express();
const cors = require("cors");


/*
    SPA-yes, use this

    use local mongoose/mongodb

    user has:
    name
    email
    birthday
    password
    photo

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

app.listen();