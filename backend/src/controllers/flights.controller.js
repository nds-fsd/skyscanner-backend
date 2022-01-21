const flightsModel = require("../models/flights.model");
const Airports = require("../models/airport.model")
const flightsControllers = {};

flightsControllers.getallflights = async (req, res) => {

    const allflights = await flightsModel.find();
    //.populate('from').populate('to').populate('airline');
       
    res.json(allflights);
};

flightsControllers.createflight = async (req, res) => {

    const { from, to ,dedate, arrdate, price, airline} = req.body;
    const newflight = new flightsModel({
        from,
        to,
        dedate,
        arrdate,
        price,
        airline
    });
    await newflight.save();
    res.json('Nuevo vuelo añadido');

    /*const airportId = req.body.from;
    const airports = await Airports.findById(airportId);
    airports.city.push(newflight);
    await airports.save();*/
};


flightsControllers.searchflights = async (req, res) => {
    
    const from = req.query.from;
	const to = req.query.to;
    const dedate = req.query.dedate;
    const arrdate = req.query.arrdate;
    
    console.log(req.query)
     
    //const textparam = req.params.textparam;
    //const flightssearch = await flightsModel.find({from:textparam });
    const flightssearch = await flightsModel.find({from, to, dedate, arrdate});
    
    res.json(flightssearch);

};
flightsControllers.removeFlightById = (req, res) => {
    const id = req.params.id;
    flightsModel.findByIdAndDelete(id, {}, (error, result) =>{
     if(error){
         res.status(500).json({error: error.message});
     }else if(!result){
         res.status(404);
     }else{
         res.status(204).send();
     }
    })
  };

  flightsControllers.updateById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
  
    const updatedFlight = {
      id:id,
      from: data.from,
      to: data.to,
      dedate: data.dedate,
      arrdate: data.arrdate,
      airline: data.airline
    };
  
    res.json({message: "Vuelo actualizado", updatedFlight})
  };

module.exports = flightsControllers;