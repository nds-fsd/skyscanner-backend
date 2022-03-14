const express = require("express");
const router = express.Router();
const {getallflights, createflight, searchflights,removeFlightById, updateById, getOneFlight, updateSeats} = require("../controllers/flights.controller");
const {authMiddleware} = require('../middlewares/authMiddleware');
const {isAdmin} = require('../middlewares/authMiddleware');

router.route('/')
    .get(authMiddleware,isAdmin, getallflights)
    .post(authMiddleware, isAdmin, createflight);
   
router.route('/search')
    .get(searchflights);
    
router.route("/:id")
    //.get(searchFlightById)
    .delete(authMiddleware, removeFlightById)
    .put(authMiddleware,isAdmin, updateById)
    .get(authMiddleware, getOneFlight);

router.route("/booking/:id")
    .put(authMiddleware, updateSeats);

module.exports = router;