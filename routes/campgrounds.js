var express       = require("express"),
    router        = express.Router(),
    Campground    = require("../models/campground"),
    middlewareObj = require("../middleware");
    


router.get("/",function(req,res){
    Campground.find({},function(err,campgrounds){
        if (!err){
            res.render("campgrounds/index",{campgrounds: campgrounds});
        }
    });
});
router.get("/new",middlewareObj.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});
router.get("/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foudnCamp){
        if(!err){
            res.render("campgrounds/show",{campground: foudnCamp});

        }
    });
});

router.post("/",middlewareObj.isLoggedIn,function(req,res){
    var author= {
        id: req.user._id,
        username: req.user.username
    };
    var newCampGround = {name: req.body.name ,image: req.body.img,description: req.body.description,price: req.body.price,author:author};
    Campground.create(newCampGround);
    req.flash("success","Successfuly Created Campground");
    res.redirect("/campgrounds");
});
router.get("/:id/edit",function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/edit",{campground: campground}); 

        }
    });
});
router.put("/:id",middlewareObj.CampgroundOwner,function(req,res){
    var newCampGround = req.body.campground;
    Campground.findByIdAndUpdate(req.params.id,newCampGround,function(err,updatedCampground){
      if(err){
          req.flash("erorr", "Something Went Wrong!");
          res.redirect("/campgrounds")
      } else{
          req.flash("success","Successfuly Edited the Campground");
          res.redirect("/campgrounds/"+req.params.id);
      }
    });
});
router.delete("/:id",middlewareObj.CampgroundOwner,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
          req.flash("erorr", "Something Went Wrong!");
       } else{
           req.flash("success","Successfuly Deleted the Campground");
           res.redirect("/campgrounds");
       }
    });
});


module.exports = router;