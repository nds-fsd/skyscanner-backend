const express = require("express");
const router = express.Router();
const airlineController = require("../controllers/airline.controller");
const {authMiddleware} = require('../middlewares/authMiddleware');
router
  .route("/")
  .get(authMiddleware, airlineController.all)
  .post(authMiddleware, airlineController.create);

router
  .route("/:id")
  .get(airlineController.get)
  .delete(authMiddleware, airlineController.remove)
  .put(authMiddleware, airlineController.update);


router.route("/search/:text").get(airlineController.search);


module.exports = router;