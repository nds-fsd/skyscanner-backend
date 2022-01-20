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


const express = require("express");
const app = express();

const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 
}));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

const airlines = require("../src/routers/airlines.routers");
app.use("/airlines", airlines);

const airports = require("../src/routers/airports.routers");
app.use("/airports", airports);

const flights = require("../src/routers/flights.router");
app.use("/flights", flights);


app.listen(3020, () => {
  console.log(`REST API listening on http://localhost:3020/`);
});
