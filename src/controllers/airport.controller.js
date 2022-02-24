const Airports = require('../models/airport.model');
const airportControllers = {};

airportControllers.getallAirports = async (req, res) => {
  const getallAirports = await Airports.find();
  res.json(getallAirports);
}


airportControllers.getOneFlight = async (req, res) => {
  const id = req.params.id; 
  Airports.findById(id, {}, {} , (error, airport) => {

     if(error){
         res.status(500).json({error: error.message});
     } else if(!airport){
         res.status(404).send();
     } else {
         res.json(airport);
     }
 }); 
};

airportControllers.searchAirports = async (req, res) => {
   
  const text = req.params.text;
  const searchAirports = await Airports.find({
    name: { $regex: text, $options: "e" },
   });

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

  res.status(201).json (newAirport);
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
  Airports.findByIdAndUpdate(id, {}, (error, result) =>{
    if(error){
        res.status(500).json({error: error.message});
    }else if(!result){
        res.status(404);
    }else{
        res.status(204).send();
    }
   })
   res.status(201).json (updatedAirport);
};

module.exports = airportControllers;