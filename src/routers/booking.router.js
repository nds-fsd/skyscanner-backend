const express = require("express");
const {getBookedFlights, getBookings, saveBooking} = require("../controllers/booking.controller");
const router = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware');

router.route("/")
    .get(authMiddleware, getBookings)
    .post(authMiddleware, saveBooking);


router.route("/:id")
    .get(authMiddleware, getBookedFlights);

module.exports = router;