const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String},
    email: {type:String, required:true},
    password:{type:String, required:true}

});

    /*userSchema.path('email').validate(async (email) => {
    const emailCount = await mongoose.models.users.countDocuments({ email })
    return !emailCount
  }, 'Email already exists')*/


const User = mongoose.model("User", userSchema)
module.exports = User
