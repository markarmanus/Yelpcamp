var express       = require("express"),
    router        = express.Router(),
    Campground    = require("../models/campground"),
    middlewareObj = require("../middleware");
    

//route for campgrounds page
router.get("/",function(req,res){
    
    Campground.find({},function(err,campgrounds){
        
        if (!err){
            
            res.render("campgrounds/index",{campgrounds: campgrounds});
        }
    });
});



//route for campground show page
router.get("/:id",function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err,foudnCamp){
        
        if(!err){
            
            res.render("campgrounds/show",{campground: foudnCamp});
        }
    });
});


//route to show creat a new campground form
router.get("/new",function(req, res) {
   res.render("campgrounds/new"); 
});



//route for poting new campground in dataBase
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


//route for shwoing the form for editing an exisitng campground 
router.get("/:id/edit",function(req, res) {
    
    Campground.findById(req.params.id,function(err,campground){
        
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/edit",{campground: campground}); 

        }
    });
});



//route to save changes made to campground in data base
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



//route to delete a campground
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