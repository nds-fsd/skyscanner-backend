const express = require("express");
const {getFavFlights, getFavs, saveFav} = require("../controllers/favorite.controller");
const FavoriteRouter = express.Router();

FavoriteRouter.route("/")
    .get(getFavs)
    .post(saveFav);


FavoriteRouter.route("/:id")
    .get(getFavFlights);

module.exports = FavoriteRouter;