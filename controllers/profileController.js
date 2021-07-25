const express = require("express");
const User = require("../models/user");

exports.home_get = (req,res,next)=>{
       
    User.findById(req.user.id)
    .populate({path: "posts",
    options: {
        limit: 5,
        sort: {created: -1}
    }, //double-check that multiple paths at the same level will work
    path: "friends",
     populate: {
        path: "posts",
        options: {
             //limit the number of returned posts to 8-10
            limit: 10,
            //sort by newest posts
            sort: {created: -1} //or {date: -1}
        }, 
        populate: {
            path: "comments",
            options: {
                limit: 2,
                sort: {created: -1}
            }
        }
    }}).exec((err, friendsData)=>{
        if (err){next(err);}
        return res.json(friendsData);
    });
}

