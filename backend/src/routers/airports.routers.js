const express = require("express");
const router = express.Router();

const {
   getallAirports, 
   getOneFlight, 
   searchAirports, 
   createAirport, 
   removeById, 
   updateByID
} = require("../controllers/airport.controller");

router.route('/')
   .get(getallAirports)
   .post(createAirport);

router.route("/:id")
  .get(getOneFlight)
  .delete(removeById)
  .put(updateByID);
   
router.route('/search/:text')
   .get(searchAirports);
   
module.exports = router;