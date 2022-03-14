const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String},
    email: {type:String, required:true},
    password:{type:String, required:true},
    prefairport: {type:String},
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
    
    fav: {type:Array},
    /*[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "flights"
    }],*/
    booking: [
            {   
            outbound:String,
            return: String
        
            }
    ]

});


const User = mongoose.model("User", userSchema)
module.exports = User
