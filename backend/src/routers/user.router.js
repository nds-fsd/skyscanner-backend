const express = require("express");
const UserController = require("../controllers/user.controller");
const UserRouter = express.Router()
UserRouter.get("/", UserController.findAll);
UserRouter.post("/", UserController.saveUser);
module.exports = {UserRouter};