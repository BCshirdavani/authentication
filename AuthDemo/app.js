
var express                 = require("express");
var mongoose                = require("mongoose");
var passport                = require("passport");
var bodyParser              = require("body-parser");
var LocalStrategy           = require("passport-local");
var passportLocalMongoose   = require("passport-local-mongoose");
var User                    = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });


var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// setup passport
app.use(require("express-session")({
    secret: "Quokkas are awesome",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());     // setup passport
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//===================================================
//  ROUTES
//===================================================

// home page route
app.get("/", function(req, res){
    res.render("home");
});

// secret route
app.get("/secret", function(req, res){
    res.render("secret");    
});

//---------------------------------------- Auth Routes
// Show sign in form
app.get('/register', function(req, res){
    res.render("register");
})
// handling user sign up
app.post("/register", function(req, res){
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, function(error, user){
        if(error){
            console.log(error);
            res.render('register')
        }else{
            passport.authenticate('local')(req, res, function(){
                console.log("logged in, redirecting to secret page");
                res.redirect('/secret');
            })
        }
    });
})


//----------------------------------------  login routes

// render login form
app.get("/login", function(req, res){
    console.log("logging in");
   res.render("login"); 
});

// login logic - with middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
    console.log("running function in login logic route");
});








app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});