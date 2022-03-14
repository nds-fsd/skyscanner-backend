const express = require("express");
const router = express.Router();
const {getallflights, createflight, searchflights,removeFlightById, updateById, getOneFlight, updateSeats} = require("../controllers/flights.controller");
const {authMiddleware} = require('../middlewares/authMiddleware');

router.route('/')
    .get(authMiddleware, getallflights)
    .post(authMiddleware, createflight);
   
router.route('/search')
    .get(searchflights);
    
router.route("/:id")
    //.get(searchFlightById)
    .delete(authMiddleware, removeFlightById)
    .put(authMiddleware, updateById)
    .get(authMiddleware, getOneFlight);

router.route("/booking/:id")
    .put(authMiddleware, updateSeats);

module.exports = router;