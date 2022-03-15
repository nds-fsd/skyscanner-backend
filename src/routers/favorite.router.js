const express = require("express");
const {getFavFlights, getFavs, saveFav, removeFavorite} = require("../controllers/favorite.controller");
const FavoriteRouter = express.Router();

FavoriteRouter.route("/")
    .get(getFavs)
    .post(saveFav)
    .delete(removeFavorite)


FavoriteRouter.route("/:id")
    .get(getFavFlights);

module.exports = FavoriteRouter;