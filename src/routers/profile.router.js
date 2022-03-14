const express = require("express");
const {body} = require("express-validator");
const ProfileRouter = express.Router();
const {removeProfileById, updateProfileById, changePassword, getOneUser, addAirportById,getOneUserbyEmail, addToFavFlight, addBooking, deleteOneBooking} = require("../controllers/profile.controller");
const {authMiddleware} = require('../middlewares/authMiddleware');

ProfileRouter.route('/:id')
    .get(authMiddleware, getOneUser);
    
ProfileRouter.route("/:id")
    //.get(searchFlightById)
    .delete(authMiddleware, removeProfileById)
    .put(updateProfileById);

ProfileRouter.route("/favairport/:id")
    .put(authMiddleware, addAirportById);

ProfileRouter.route("/:id")
    .post(
        body("password", "Password must have at least 8 characters, one digit [0-9], At least one lowercase character, at least one uppercase character, at least one special character").isLength({min:8}).matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"), authMiddleware,
        changePassword
    );

ProfileRouter.route("/datauser/:email").get(authMiddleware, getOneUserbyEmail);

ProfileRouter.route("/favflights/:id")
    .put(authMiddleware, addToFavFlight);

ProfileRouter.route("/booking/:id")
    .put(authMiddleware, addBooking);

ProfileRouter.route("/removebooking/:id")
    .put(authMiddleware, deleteOneBooking);


module.exports = ProfileRouter;

