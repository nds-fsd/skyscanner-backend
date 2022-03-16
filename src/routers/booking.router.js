const express = require("express");
const {getBookedFlights, getBookings, saveBooking, removeBooking} = require("../controllers/booking.controller");

const {authMiddleware} = require('../middlewares/authMiddleware');
//const {isAdmin} = require('../middlewares/authMiddleware');
const BookingRouter = express.Router();

BookingRouter.route("/")
    .get(authMiddleware, getBookings)
    .post(authMiddleware, saveBooking)
    .delete(authMiddleware, removeBooking);

BookingRouter.route("/:id")
    .get(authMiddleware, getBookedFlights);

const BookingRouter = express.Router();

BookingRouter.route("/")
    .get(getBookings)
    .post(saveBooking)
    .delete(removeBooking);

BookingRouter.route("/:id")
    .get(getBookedFlights);


module.exports = BookingRouter;