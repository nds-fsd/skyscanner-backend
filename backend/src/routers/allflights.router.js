const express = require("express");
const router = express.Router();
const {getallflights, createflight, searchallflights} = require("../controllers/allflights.controller");

router.route('/')
    .get(getallflights)
    .post(createflight);
   
    router.route('/:textparam')
    .get(searchallflights);
    



module.exports = router;