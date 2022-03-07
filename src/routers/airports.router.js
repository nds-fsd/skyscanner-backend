const express = require("express");
const router = express.Router();

const {
   getallAirports, 
   getOneAirport, 
   searchAirports, 
   createAirport, 
   removeById, 
   updateByID
} = require("../controllers/airport.controller");

router.route('/')
   .get(getallAirports)
   .post(createAirport);

router.route("/:id")
  .get(getOneAirport)
  .delete(removeById)
  .put(updateByID);
   
router.route('/search/:text')
   .get(searchAirports);
   
module.exports = router;