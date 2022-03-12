const express = require("express");
const {getBookedFlights, getBookings, saveBooking} = require("../controllers/booking.controller");
const BookingRouter = express.Router();

BookingRouter.route("/")
    .get(getBookings)
    .post(saveBooking);


BookingRouter.route("/:id")
    .get(getBookedFlights);

module.exports = BookingRouter;