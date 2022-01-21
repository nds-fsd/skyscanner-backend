const Airports = require('../models/airport.model');
const mongoose = require("mongoose");
const airportControllers = {};

airportControllers.getallAirports = async (req, res) => {
  const getallAirports = await Airports.find();/*.polulate('airline)*/
  res.json(getallAirports);
}


airportControllers.getOneFlight = async (req, res) => {
  const id = req.params.id; 
  Airports.findById(id, {}, {} , (error, airports) => {

     if(error){
         res.status(500).json({error: error.message});
     } else if(!airports){
         res.status(404).send();
     } else {
         res.json(airports);
     }
 }); 
};

airportControllers.searchAirports = async (req, res) => {
  const code = req.query.code;
  const name = req.query.name;
  const city = req.query.city;
  const country = req.query.country;
  const airline = req.query.airline;

  console.log(req.query)
   
  //const textparam = req.params.textparam;
  //const flightssearch = await flightsModel.find({from:textparam });

  const searchAirports = await Airports.find({code, name, city, country, airline});
  res.json(searchAirports);

};

airportControllers.createAirport = async (req, res) => {

  const body = req.body;
  const data = {
    
    code:body.code,
    name:body.name,
    city:body.city,
    country:body.country,
    airline:body.airline
  }

  const newAirport = new Airports(body);

  await newAirport.save()

  console.log('Creating new Airport');

  res.json({Message: "Your new Airport was created Succesfully", newAirport});
};


airportControllers.removeById = (req, res) => {
  const id = req.params.id;
  Airports.findByIdAndDelete(id, {}, (error, result) =>{
   if(error){
       res.status(500).json({error: error.message});
   }else if(!result){
       res.status(404);
   }else{
       res.status(204).send();
   }
  })
};

airportControllers.updateByID = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const updatedAirport = {
    id:id,
    code: data.code,
    name: data.name,
    city: data.city,
    country: data.country,
    airline: data.airline
  };

  res.json({message: "Your Airport has been updated Succesfully", updatedAirport})
};

module.exports = airportControllers;