const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String},
    email: {type:String, required:true},
    password:{type:String, required:true},
    prefairport: {type:String},
    fav: {type:Array}

});


const User = mongoose.model("User", userSchema)
module.exports = User
