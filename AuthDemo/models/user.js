
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");



var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);       // adds new methods to our user schema - serialize methods

module.exports = mongoose.model("User", UserSchema);