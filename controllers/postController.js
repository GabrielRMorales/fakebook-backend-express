const Post = require("../models/post");
const {check, validationResult } =require("express-validator");
const jwt = require("jsonwebtoken");
const SECRET_CODE = process.env.SECRET_CODE;

exports.get_user_posts = (req,res,next)=>{
    //for a user's page, getting more posts as a user scrolls down their page 
    //req can include the last post visible on the page. Continue retrieving posts from this point on
    Post.find({user: req.params.id}).limit(10)
    .populate({path: "comments",
    options: {
        limit: 2,
        sort: {date: -1}
    }})
    .exec((err,userPosts)=>{
        if(err){next(err)}
        return res.json(userPosts);
    });
}

exports.new_post = [
    check("title").trim().escape().isLength({min: 5}),
    check("text").trim().escape().isLength({min: 5}),
    (req,res,next)=>{
        let {title,text} = req.body;
     let errors = validationResult(req);
     if (!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
     }
     let newPost = new Post({
         title,
         text,
         user: req.user._id
     });
     newPost.save().then(post=>res.status(200).json({post}))
     .catch(err=>{
         errors = errors.array();
         errors.push(err);
         return res.status(500).json(errors);
     });

}]
//obviously, the user should not even be shown edit post buttons for those that are not theirs, but this is just a precaution
exports.edit_post = [
    check("title"),
    check("text"),
    async (req,res,next)=>{
        let {title,text} = req.body;
        
        let token = authorization.header.split("-")[1];
        let decoded = jwt.verify(token, SECRET_CODE);
        let post = await Post.findById(req.params.id);
        let postAuthor = await User.findById(post.user);

        if (decoded.user._id!==postAuthor.id){
            return next({
                status: 401,
                message: "Please log in as proper user."
            })
        }
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors});
        } else if (decoded.user_id==postAuthorId){
            //instead of creating a whole new Post and replacing with this, simply update certain fields
            Post.findByIdAndUpdate(req.params.id, {title, text},(err, resultPost)=>{
                if (err){next(err);}
                return res.json(resultPost);
            })
        }

}]

exports.delete_post = (req,res,next)=>{
    Post.findById(req.params.id).exec((err,post)=>{
        if(err){next(err);}
        if(!post){
            return res.send({message: "This post could not be deleted because it was no longer in the database."});
        }
        Post.findByIdAndRemove(req.params.id, err=>{
            if (err){next(err);}
            return res.send({message: "This post has been deleted."})
        });
    })

}