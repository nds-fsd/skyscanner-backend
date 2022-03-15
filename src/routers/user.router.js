const express = require("express");
const UserController = require("../controllers/user.controller");
const {body} = require("express-validator");
const UserRouter = express.Router()

UserRouter.route("/")
    .post(
        body("email", "Email must be a valid email.").isEmail(),
        body("password", "Password must have at least 8 characters, one digit [0-9], At least one lowercase character, at least one uppercase character, at least one special character").isLength({min:8}).matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
        UserController.saveUser
    )
    .get(UserController.findAll);

UserRouter.route("/")
    .post(UserController.saveUser)
    .get(UserController.findAll);

module.exports = UserRouter;