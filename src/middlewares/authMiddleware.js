const jwt = require("jsonwebtoken");
const User = require('../models/user.model');

exports.authMiddleware = async (req, res, next)=> {
    // Token is inside the "Authorization" header, with a value like this:
    // "Bearer ey123bcashkjhacakb.asdasdasdas.asdasdasd"
    // We split that string by a space (" ") and retrieve the second item (the token itself)
    const token = req.headers.authorization?.split(" ")[1];

    // The verify() method will throw an error if the token is invalid, so we use
    // a try/catch block to handle the error thrown and return 400
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

}