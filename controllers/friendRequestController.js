const FriendRequest = require("../models/friendRequest");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

exports.get_friend_request = (req,res,next)=>{
    FriendRequest.find({sender: req.params.id}).exec((err, requests)=>{
        if(err){next(err);}
        return res.json(requests);
    });
}

exports.new_friend_request = (req,res,next)=>{
//probably access recipient id through req.body and sender id through req.user
//ensure only a friendRequest can only be sent to someone if they have no
//friendRequests that are Accepted or Pending. If it's declined, another can be sent
    FriendRequest.findOne({sender: req.user.id, recipient: req.body.id})
    .exec(function(err, results){
        if(err){next(err);}
        if(results.status=="Accepted" || results.status=="Pending"){
            //throw error
        } else if(results.status=="Declined" || results==null){
            let newFriendRequest = new FriendRequest({
                sender: req.user._id,
                recipient: req.body.id,
                status: "Pending"
            });
            newFriendRequest.save().then(friendRequest=>{
                return res.status(200).json({message: "Friend Request Sent"});
            }).catch(err=>{
                return res.status(500).json({errors: err});
            })
        }
    })


}

/*
when a user clicks reject for a friend request, a put request will change the 
status of it to declined. A declined one should only show up in the sender's requests,
not the recipients at this point
*/

exports.edit_friend_request = [
    check("status"),
    //validate that the response by checking that it's either accepted or declined 
    (req,res,next)=>{
        let errors = validateResult(req);
    //presumably get the friend request id by the params 
    FriendRequest.findOne(req.params.id).exec((err, results)=>{
        if (err){next(err);}
        if(results.status == "Pending"){
            FriendRequest.findByIdAndUpdate(req.params.id, {status: req.body.status},
                function(err, newStatus){
                if (err){return next(err);}
                return res.json(newStatus);
            })
        }
    })

}]

/*
The sender can also delete a sent request, which deletes it from the db
*/
exports.delete_friend_request=(req,res,next)=>{
    FriendRequest.findById(req.params.id).exec((err, friendRequest)=>{
        if (err){next(err);}
        if (friendRequest.status=="Pending"){
            FriendRequest.findByIdAndRemove(req.params.id, err=>{
                if (err){next(err);}
                return res.send({message: "This friend request has been deleted."})
            })
        } else {
            return res.send({message: "Friend Request cannot be deleted."});
        }
    })
}

//not here, but in a separate controller...
/*
when the user clicks accept for a friendrequest, a post request will be sent to make a 
new friendship and save this.


*/