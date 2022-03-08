const express = require("express");
const {body} = require("express-validator");
const ProfileRouter = express.Router();
const {removeProfileById, updateProfileById, changePassword, getOneUser, addAirportById,getOneUserbyEmail, addToFavFlight, addBooking, deleteOneBooking} = require("../controllers/profile.controller");

ProfileRouter.route('/:id')
    .get(getOneUser);

    
ProfileRouter.route("/:id")
    //.get(searchFlightById)
    .delete(removeProfileById)
    .put(updateProfileById);
ProfileRouter.route("/favairport/:id")
    .put(addAirportById);

ProfileRouter.route("/:id").post(body("password", "Password must have at least 8 characters, one digit [0-9], At least one lowercase character, at least one uppercase character, at least one special character").isLength({min:8}).matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
changePassword);

ProfileRouter.route("/datauser/:email").get(getOneUserbyEmail);

ProfileRouter.route("/favflights/:id")
    .put(addToFavFlight);

ProfileRouter.route("/booking/:id")
    .put(addBooking);

ProfileRouter.route("/removebooking/:id")
    .put(deleteOneBooking);


module.exports = {ProfileRouter};

