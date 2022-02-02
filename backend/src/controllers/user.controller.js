const User =require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");

const findAll = (req, res) => {
    const handleSuccess = (users) => {
        res.status(200).json(users);
    };
    const handleError = error => {
        res.status(500).json(error);
    }
    User.find().then(handleSuccess).catch(handleError);
};

// Creación de user sin hasheo de password.
// const create = (req, res) => {
// const body = req.body
// if (!body.email){
//     return  res.status(400).json("email not recieved");
// }
// const handleSuccess = (user) => {
//     res.status(201).json(user);
// };
// const handleError = (error) => {
//     res.status(500).json(error);
// }
// User.create(body).then(handleSuccess).catch(handleError)
// };


const saveUser = async (req, res) => {
    // Ideally, we would validate that the input coming from the request is well formed
  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json(errors);
    }
    try {
    // We extract the email and password fields from the request body by destructuring
    const { email, password, firstname, lastname } = req.body;

    //TODO: comprobar si ya existe el email en la BD
  
    // We hash the password
    const genSalt = 10;
    const passwordHashed = bcrypt.hashSync(password, genSalt);
  
    // We save on db a new user with the password hashed
    const newUser = new User({
      firstname: firstname,
      lastname: lastname,      
      email: email,
      password: passwordHashed,
    });
    const userSaved = await newUser.save();
  
    // We sign a JWT and return it to the user
    const token = jwt.sign({ id: userSaved._id }, process.env.JWT_SECRET);
    return res.status(201).json({ token: token, user: userSaved  });
  } catch (error) {res.status(400).send(error)}};

  const UserController = {
    findAll,
    saveUser,
}

module.exports = UserController;