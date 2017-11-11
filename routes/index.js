//all unsectioned routes


var express    = require("express"),
    router     = express.Router(),
    User       = require("../models/user"),
    passport   = require("passport");
    
//home page route
router.get("/",function(req,res){
    res.render("home");
});




// route tos how register form 
router.get("/register",function(req, res) {
   res.render("register");
});




//route to post user to data base
router.post("/register",function(req, res) {
    
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,User){
        
        if(err){
            req.flash("erorr", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            
            req.flash("success","Welcome to YelpCamp " + User.username);
            res.redirect("/campgrounds"); 
        });
    })
});





//route ro show login form 
router.get("/login",function(req, res) {
    res.render("login");
});





// route to authenticate user from data base and log in
router.post("/login",passport.authenticate("local",{
    
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req, res) {
    });





//route to log user out
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Successfuly Logged You Out");
    res.redirect("/campgrounds");
});



module.exports = router;