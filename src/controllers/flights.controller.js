const flightsModel = require("../models/flights.model");

const flightsControllers = {};
try{
flightsControllers.getallflights = async (req, res) => {

    const allflights = await flightsModel.find();
    //.populate('from').populate('to').populate('airline');
       
    res.json(allflights);
};} catch (error) {res.status(500).send(error)};

try{
flightsControllers.createflight = async (req, res) => {

    const { from, to ,dedate, price, airline, flighttime, seats} = req.body;
    const newflight = new flightsModel({
        from,
        to,
        dedate,
        price,
        airline,
        flighttime,
        seats
    });
    await newflight.save();
    res.status(201).json(newflight);

};} catch (error) {res.status(500).send(error)};

try {
flightsControllers.searchflights = async (req, res) => {
    
    const from = req.query.from;
	const to = req.query.to;
    const dedate = req.query.dedate;
    const fecha = new Date(dedate);
    const dias = 1; // Número de días a sumar
    fecha.setDate(fecha.getDate() + dias);
   
    const flightssearch = await flightsModel.find({from, to, dedate:{"$gte": dedate, "$lt": fecha}});
    
    if(flightssearch.length === 0){
        res.status(404).send("no flights found");
    }
     else {
        res.json(flightssearch);
    }
    //res.json(flightssearch);

};} catch (error) {res.status(500).send(error)};  

flightsControllers.getOneFlight = async (req, res) => {
    const id = req.params.id; 

    flightsModel.findById(id, {}, {} , (error, flight) => {
  
       if(error){
           res.status(500).json({error: error.message});
       } else if(!flight){
           res.status(404).send();
       } else {
           res.json(flight);
       }
   }); 
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
        price: data.price,
        airline: data.airline,
        flighttime: data.flighttime,
        seats: data.seats
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

  flightsControllers.updateSeats = async (req, res) => {

    const data = req.body;
    const id = req.params.id;
    const bookingseats = data.bookingseats;
    
    const flightseats = await flightsModel.findByIdAndUpdate(
        {_id:id},
        {$inc: {seats: - bookingseats }}
        );
    
        if(!flightseats){
            res.status(404).send("no flights found");
        }
            
        else {
            res.json("update seats");
        }
        
  };

module.exports = flightsControllers;