const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");

const login = async (req, res) => {
  // Ideally, we would validate that the input coming from the request is well formed

  // We extract the email and password fields from the request body by destructuring
  const { email, password } = req.body;

  // We look among our users by the email. If there's no result, email is not from a registered user
  const user = await userModel.findOne({ email: email });
  console.log("findOne donde estas",user)
  // We hash the password
  const genSalt = 10;
  const passwordHashed = bcrypt.hashSync(password, genSalt);
  console.log("donde estas password", passwordHashed)

  if (!user) return res.status(400).send("Email does not exist");
  if (user && user.password !== passwordHashed) return res.status(400).send("Password does not match");

  // If everything matches, we generate a JWT and send it back to the user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token: token });
};

module.exports = login;