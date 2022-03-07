const express = require("express");
const router = express.Router();
const {getallflights, createflight, searchflights,removeFlightById, updateById, getOneFlight} = require("../controllers/flights.controller");

router.route('/')
    .get(getallflights)
    .post(createflight);
   
router.route('/search')
    .get(searchflights);
    
router.route("/:id")
    //.get(searchFlightById)
    .delete(removeFlightById)
    .put(updateById)
    .get(getOneFlight);

module.exports = router;