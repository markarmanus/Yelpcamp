// file for middleware

//requiring the models
var Comment     = require("../models/comment");
var Campground  = require("../models/campground");


// creating an object to return with all middle ware functions.
var middlewareObj = {
    // Checks if the user has access to edit or delete the comment
    CommentOwner(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentId,function(err, comment) {
            if(err){
                
                req.flash("erorr","cant find this Comment");
                res.redirect("back");
            }else{
                
               if(comment.author.id.equals(req.user._id)){
                    return next()
        
                }else{
                    
                    req.flash("not-yours","You need to be the owner to change this");
                    res.redirect("back");
                }   
            }
            
        });
    }else{
        
        req.flash("erorr","you need to Login to do this");
        res.redirect("/login");
    }
       
    

},  
    // checks if the user is logged in
     isLoggedIn(req,res,next) {
        if(req.isAuthenticated()){
        
            return next();
        }
    
    req.flash("erorr","you need to Login to do this");
    res.redirect("/login");
    },
    // cheacks if this is a campground posted from this user
    CampgroundOwner(req,res,next){
        
        if(req.isAuthenticated()){
            Campground.findById(req.params.id,function(err, campground) {
                if(err){
                    
                    req.flash("erorr","cant find this Campground");
                    res.redirect("back");
                }else{
                    
                    if(campground.author.id.equals(req.user._id)){
                        return next()
        
                    }else{
                        
                    req.flash("not-yours","you have to be the owner to do this");
                    res.redirect("back");
        
                }   
            }
            
            });
        }else{
            
            req.flash("erorr","you need to Login to do this");
            res.redirect("/login");
    }
       
    

}
};
// returns the middleware Obj
module.exports = middlewareObj;