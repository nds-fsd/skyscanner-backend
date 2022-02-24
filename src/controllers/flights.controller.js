const flightsModel = require("../models/flights.model");

const flightsControllers = {};

flightsControllers.getallflights = async (req, res) => {

    const allflights = await flightsModel.find();
    //.populate('from').populate('to').populate('airline');
       
    res.json(allflights);
};

flightsControllers.createflight = async (req, res) => {

    const { from, to ,dedate, price, airline, flighttime} = req.body;
    const newflight = new flightsModel({
        from,
        to,
        dedate,
        price,
        airline,
        flighttime
    });
    await newflight.save();
    res.status(201).json(newflight);

};


flightsControllers.searchflights = async (req, res) => {
    
    const from = req.query.from;
	const to = req.query.to;
    const dedate = req.query.dedate;
    const fecha = new Date(dedate);
    const dias = 1; // Número de días a sumar
    fecha.setDate(fecha.getDate() + dias);
   
    const flightssearch = await flightsModel.find({from, to, dedate:{"$gte": dedate, "$lt": fecha}});
    
    res.json(flightssearch);

};

flightsControllers.removeFlightById = (req, res) => {
    const id = req.params.id;
    
    flightsModel.findByIdAndDelete(id, {}, (error, result) =>{
     if(error){
         res.status(500).json({error: error.message});
     }else if(!result){
         res.status(404).send();
     }else{
         res.json(result);
     }
    })
  };

  flightsControllers.updateById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updatedFlight = {
        
        from: data.from,
        to: data.to,
        dedate: data.dedate,
        //arrdate: data.arrdate,
        price: data.price,
        airline: data.airline,
        flighttime: data.flighttime
      };
    flightsModel.findByIdAndUpdate(id, updatedFlight, {returnDocument: 'after'},(error, result) =>{
        if(error){
            res.status(500).json({error: error.message});
        }else if(!result){
            res.status(404);
        }else{
            res.status(200).send();
        }
       })
    
  
    res.json({message: "Vuelo actualizado", updatedFlight})
  };

module.exports = flightsControllers;