const express = require("express");
const {getBookedFlights, getBookings, saveBooking, removeBooking} = require("../controllers/booking.controller");
const BookingRouter = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware');
//const {isAdmin} = require('../middlewares/authMiddleware');


BookingRouter.route("/")
    .get(authMiddleware, getBookings)
    .post(authMiddleware, saveBooking)
    .delete(authMiddleware, removeBooking);

BookingRouter.route("/:id")
    .get(authMiddleware, getBookedFlights);

BookingRouter.route("/")
    .get(getBookings)
    .post(saveBooking)
    .delete(removeBooking);

BookingRouter.route("/:id")
    .get(getBookedFlights);


module.exports = BookingRouter;