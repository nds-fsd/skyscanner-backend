// Imports dotenv library (this library loads into the app all environment variables located on .env file)
require("dotenv").config();

// Creates a mongoose instance and connects to MongoDB
const mongoose = require("mongoose");
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_HOST, options);
const mongo = mongoose.connection;
mongo.on('error', (err) => console.error(err));
mongo.once('open', () => {
  console.log('Connected to SkyScannerDB')
})

// Creates an express instance and sets it up
const express = require("express");
const app = express();

const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by Nuclio");

// Add services routes to express instance

const flights = require("./src/routers/flights.router");
app.use("/flights", flights);

// Function that will start the express server when called
app.listen(5001, () => {
  console.log(`REST API listening on http://localhost:5001/`);
});
