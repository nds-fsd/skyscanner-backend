const express = require("express");
const router = express.Router();
const {getallflights, createflight, searchflights} = require("../controllers/flights.controllers");

router.route('/')
    .get(getallflights)
    .post(createflight);
   
    router.route('/search')
    .get(searchflights);
    



module.exports = router;