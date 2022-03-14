const express = require("express");
const {getBookedFlights, getBookings, saveBooking, removeBooking} = require("../controllers/booking.controller");
const BookingRouter = express.Router();

BookingRouter.route("/")
    .get(getBookings)
    .post(saveBooking)
    .delete(removeBooking);

BookingRouter.route("/:id")
    .get(getBookedFlights);

module.exports = BookingRouter;