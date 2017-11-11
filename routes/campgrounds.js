var express       = require("express"),
    router        = express.Router(),
    Campground    = require("../models/campground"),
    middlewareObj = require("../middleware");
    

// route to show all campgrounds page
router.get("/",function(req,res){
    
    Campground.find({},function(err,campgrounds){
        
        if (!err){
            res.render("campgrounds/index",{campgrounds: campgrounds});
        }
    });
});

// route to show add form to add a new campground
router.get("/new",middlewareObj.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});





//route to post the new  campground to the data base
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






//route to show page of a campground
router.get("/:id",function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err,foudnCamp){
        
        if(!err){
            res.render("campgrounds/show",{campground: foudnCamp});
        }
    });
});






//route to show edit form for a campground
router.get("/:id/edit",function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/edit",{campground: campground}); 

        }
    });
});





//route to save changes made to the campground by pitting the changes in the data base
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




//route to delete a campground from the data base
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