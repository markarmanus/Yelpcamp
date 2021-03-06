var express       = require("express"),
    router        = express.Router({mergeParams: true}),    
    Campground    = require("../models/campground"),
    Comment       = require("../models/comment"),
    middlewareObj = require("../middleware");


//route to show new comment form
router.get("/new",middlewareObj.isLoggedIn,function(req,res){
    
    Campground.findById(req.params.id,function(err,campground){
        
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{campground:campground});
        }
    });
    
});



//route to post comment to data base
router.post("/",middlewareObj.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err, campground) {
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment,function(err,comment){
                
                if (err){
                    req.flash("erorr","Something went wrong");
                } else{
                    
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.save();
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("Successfuly Added Comment");
                    res.redirect("/campgrounds/"+req.params.id);
                  
                }
            });
        }
    });
});





//route to show edit form for comments
router.get("/:commentId/edit",middlewareObj.CommentOwner,function(req,res){
    Campground.findById(req.params.id,function(err, campground) {
        
        if(err){
            console.log(err);
        } else{
            
            Comment.findById(req.params.commentId,function(err, comment) {
                
               if(err){
                   console.log(err);
               } else{
                    res.render("comments/edit",{campground:campground,comment:comment}); 
               }
            });
        }
    });
});


// route to save cahnges made to the comment in the data base
router.put("/:commentId",middlewareObj.CommentOwner,function(req,res){
    
    Comment.findByIdAndUpdate(req.params.commentId,req.body.comment,function(err,newComment){
        
        if(err){
            console.log(err);
        } else{
            req.flash("success","Successfuly changed the comment");
            res.redirect(/campgrounds/+req.params.id);
        }
    }) 
});




//route to delete a comment from the data base
router.delete("/:commentId",middlewareObj.CommentOwner,function(req,res){
    
    Comment.findByIdAndRemove(req.params.commentId,function(err){
        
        if(err){
            console.log(err);
        }else{
            req.flash("success","Comment Deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});



module.exports = router;
