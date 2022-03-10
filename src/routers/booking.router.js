const express = require("express");
const {getBookedFlights, getBookings, saveBooking} = require("../controllers/booking.controller");
const router = express.Router();

router.route("/")
    .get(getBookings)
    .post(saveBooking);


router.route("/:id")
    .get(getBookedFlights);

module.exports = router;