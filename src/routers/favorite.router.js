const express = require("express");
const {getFavFlights, getFavs, saveFav} = require("../controllers/favorite.controller");
const FavoriteRouter = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware');

FavoriteRouter.route("/")
    .get(authMiddleware, getFavs)
    .post(authMiddleware, saveFav);


FavoriteRouter.route("/:id")
    .get(authMiddleware, getFavFlights);

module.exports = FavoriteRouter;