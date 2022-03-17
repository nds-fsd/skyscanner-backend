const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const Role = require("../models/role.model") ;

exports.authMiddleware = async (req, res, next)=> {
    
    const token = req.headers.authorization?.split(" ")[1];

    let tokenData;
    try {
        tokenData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return res.status(400).send("Invalid token");
    }

    const user = await User.findById(tokenData.id);
    if(user){
        req.sessionUser = user;
    }
    next();

};

exports.isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.sessionUser);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };