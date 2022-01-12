const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/services.controller");

// Defines which controller to call on GET and POST requests to route /
router
  .route("/")
  .get(serviceController.all)
  .post(serviceController.create);

// Defines which controller to call on GET, DELETE and POST requests to route /:id
// :id is a dynamic route, it will match whatever we put in the URL when we make the request
router
  .route("/:id")
  .get(serviceController.get)
  .delete(serviceController.remove)
  .put(serviceController.update);

// Defines which controller to call on GET requests to route /search/:text
// :text is a dynamic route, it will match whatever we put in the URL when we make the request
router.route("/search/:text").get(serviceController.search);


module.exports = router;
