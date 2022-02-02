const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema({
    email: {unique:true, type:String, required:true, trim:true},
    password:{type:String, required:true}
});
const User = mongoose.model("User", userSchema)
module.exports = User