var Comment = require("../models/comment");
var Campground = require("../models/campground");

var middlewareObj = {
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
     isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("erorr","you need to Login to do this");
    res.redirect("/login");
},
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
module.exports = middlewareObj;