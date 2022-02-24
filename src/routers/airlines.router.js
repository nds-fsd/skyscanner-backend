const express = require("express");
const router = express.Router();
const airlineController = require("../controllers/airline.controller");

// Defines which controller to call on GET and POST requests to route /
router
  .route("/")
  .get(airlineController.all)
  .post(airlineController.create);

// Defines which controller to call on GET, DELETE and POST requests to route /:id
// :id is a dynamic route, it will match whatever we put in the URL when we make the request
router
  .route("/:id")
  .get(airlineController.get)
  .delete(airlineController.remove)
  .put(airlineController.update);

// Defines which controller to call on GET requests to route /search/:text
// :text is a dynamic route, it will match whatever we put in the URL when we make the request
router.route("/search/:text").get(airlineController.search);


module.exports = router;