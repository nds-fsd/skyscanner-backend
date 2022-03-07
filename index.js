// Imports dotenv library (this library loads into the app all environment variables located on .env file)
require("dotenv").config();
// Creates a mongoose instance and connects to MongoDB
const mongoose = require("mongoose");
//const options = { useNewUrlParser: true, useUnifiedTopology: true };
try {
  mongoose.connect( process.env.DB_ATLAS, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
  console.log("connected to Mongo Atlas"));    
  }catch (error) { 
  console.log("could not connect");    
  }
//mongoose.connect(process.env.DB_HOST, options);
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

const airlines = require("./src/routers/airlines.router");
app.use("/airlines", airlines);

const airports = require("./src/routers/airports.router");
app.use("/airports", airports);

const flights = require("./src/routers/flights.router");
app.use("/flights", flights);

const login = require("./src/controllers/login.controller");
app.post("/login",login);


const {UserRouter} = require("./src/routers/user.router")
app.use("/user", UserRouter);

const {ProfileRouter} = require("./src/routers/profile.router")
app.use("/profile", ProfileRouter);

app.listen(process.env.PORT, () => {
  console.log(`REST API listening on http://localhost:3020/`);
});
