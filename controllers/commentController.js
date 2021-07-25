const Comment = require("../models/comment");
const User = require("../models/user");
const {check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const SECRET_CODE = process.env.SECRET_CODe;

exports.get_post_comments = (req,res,next)=>{
    //get all comments of a post
    Comment.find({post: req.params.id}).exec((err, comments)=>{
        if (err){ next(err);}
        return res.json(comments);
    })
}

exports.post_comment = [
    check("text").trim().escape(),
    (req,res,next)=>{
        let {text} = req.body;
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        let newComment = new Comment({
            text
        });
        newComment.save().then(comment=>{  
            return res.status(200).send({comment});
        }).catch(err=>{
            errors = errors.array();
            errors.push(err);
            return res.status(500).json({errors});
        })

}];
//obviously, the user should not even be shown edit comment buttons for those that are not theirs, but this is just a precaution
exports.edit_comment = [
    check("text"),
    async (req,res,next)=>{
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        let {text} = req.body;
        let token = authorization.header.split("-")[1];
        let decoded = jwt.verify(token, SECRET_CODE);
        let comment = await Comment.findById(req.params.id);
        let commentAuthor = await User.findById(comment.id);

        if (decoded.user._id!==commentAuthor.id){
            return res.status(401).json({message: "Please log in as proper user"})
        } else if (decoded.user._id==commentAuthor.id){
            Comment.findByIdAndUpdate(req.params.id, {text}, (err, updatedComment)=>{
                if(err){next(err);}
                return res.status(200).json(updatedComment);
            });
        }

    }];

exports.delete_comment = (req,res,next)=>{
    Comment.findById(req.params.id, (err, foundComment)=>{
        if(err){next(err);}
        if (!foundComment){
            return res.status(500).json({message: "This comment could not be deleted because it was no longer in the database."});
        }
        Comment.findByIdAndRemove(req.params.id, err=>{
            if(err){next(err);}
            return res.send({message: "This comment has been deleted."});
        }) 

    });
}