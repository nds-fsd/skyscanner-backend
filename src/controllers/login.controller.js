const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const { findOne } = require("../models/user.model");
const User = require("../models/user.model");

const login = async (req, res) => {
try {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).exec();
  
  if (!user) return res.status(400).send("Invalid email and/or password");

  // We use bcrypt to compare the password that came in the request with the password in our db
  const pwdIsValid = bcrypt.compareSync(password, user.password);
  if (!pwdIsValid) return res.status(400).send("Invalid email and/or password");

  // If everything matches, we generate a JWT and send it back to the user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '5h'});
  
  return res.status(200).json({ token: token });

} catch (error) {res.status(500).send(error)}
};

module.exports = login;
