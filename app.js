//requiring all npm pckgs
var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    Campground     = require("./models/campground.js"),
    seedDB         = require("./seeds"),
    Comment        =  require("./models/comment"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    User           = require("./models/user.js"),
    methodOverRide = require("method-override"),
    flash          = require("connect-flash");
    
// requiring all routes
var campgroundRoutes  = require("./routes/campgrounds"),
    commentRoutes     = require("./routes/comments"),
    indexRoutes       = require("./routes/index");

    
// changing express to use public directory and search isnide it
app.use(express.static(__dirname +"/public"));

// conneting to mongose data base

mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect(process.env.DATABASEURL);

// telling express to use package body-parser
app.use(bodyParser.urlencoded({extended: true}));

//setting default engine to ejs in express
app.set("view engine","ejs");


app.use(flash());


app.use(require("express-session")({
    secret: "Mark is Amazing",
    resave: false,
    saveUninitialized: false
    
}));

app.use(passport.initialize());
app.use(passport.session());
// chosing a startegy to use with passport
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
    
// defining a middle ware to be passed to all routes
app.use(function(req,res,next){
    res.locals.success      = req.flash("success");
    res.locals.erorr        = req.flash("erorr");
    res.locals.currentUser  = req.user;
    next();
});

//using method override for put and delete routes
app.use(methodOverRide("_method"));

// using all the routes we required with passing default route string to start with
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);


// starting the server
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Sever Has Started!!");
});

