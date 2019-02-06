
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

// setup passport
app.use(require("express-session")({
    secret: "Quokkas are awesome",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());     // setup passport
app.use(passport.session());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);





// home page route
app.get("/", function(req, res){
    res.render("home");
});

// secret route
app.get("/secret", function(req, res){
    res.render("secret");    
});








app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});