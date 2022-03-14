const express = require("express");
const router = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware');

const {
   getallAirports, 
   getOneAirport, 
   searchAirports, 
   createAirport, 
   removeById, 
   updateByID
} = require("../controllers/airport.controller");

router.route('/')
   .get(authMiddleware, getallAirports)
   .post(authMiddleware, createAirport);

router.route("/:id")
  .get(getOneAirport)
  .delete(authMiddleware, removeById)
  .put(authMiddleware, updateByID);
   
router.route('/search/:text')
   .get(searchAirports);
   
module.exports = router;