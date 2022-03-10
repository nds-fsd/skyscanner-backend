const express = require("express");
const router = express.Router();
const airlineController = require("../controllers/airline.controller");

router
  .route("/")
  .get(airlineController.all)
  .post(airlineController.create);

router
  .route("/:id")
  .get(airlineController.get)
  .delete(airlineController.remove)
  .put(airlineController.update);


router.route("/search/:text").get(airlineController.search);


module.exports = router;