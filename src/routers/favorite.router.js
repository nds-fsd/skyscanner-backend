const express = require("express");
const {getFavFlights} = require("../controllers/favorite.controller");
const FavoriteRouter = express.Router();

FavoriteRouter.route("/:id")
    .get(getFavFlights);

module.exports = {FavoriteRouter};