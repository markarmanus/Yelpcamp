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
    
    
var campgroundRoutes  = require("./routes/campgrounds"),
    commentRoutes     = require("./routes/comments"),
    indexRoutes       = require("./routes/index");

    
// seedDB();
app.use(express.static(__dirname +"/public"));

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect(process.env.DATABASEURL);

    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(flash());

app.use(require("express-session")({
    secret: "Mark is Amazing",
    resave: false,
    saveUninitialized: false
    
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
    
app.use(function(req,res,next){
    res.locals.success      = req.flash("success");
    res.locals.erorr        = req.flash("erorr");
    res.locals.currentUser  = req.user;
    next();
});


app.use(methodOverRide("_method"));

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);



app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Sever Has Started!!");
});

