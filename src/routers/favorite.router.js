const express = require("express");
const {getFavFlights, getFavs, saveFav, removeFavorite} = require("../controllers/favorite.controller");
const FavoriteRouter = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware');

FavoriteRouter.route("/")
    .get(authMiddleware, getFavs)
    .post(authMiddleware, saveFav)
    .delete(authMiddleware, removeFavorite)


FavoriteRouter.route("/:id")
    .get(authMiddleware,getFavFlights);

module.exports = FavoriteRouter;