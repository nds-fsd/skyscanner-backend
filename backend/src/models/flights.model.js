const {Schema, model} = require("mongoose");

const flightsSchema = new Schema({
  from: { type: String},
  to:{ type: String},
  dedate: { type: Date},
  arrdate: {type: Date},
  price: {type: Number},
  airline: { type: String} // para relacionar airline con la coleccion airline[{type:Schema.Types.ObjectId, ref:'airline'}]
});


const flightsModel = model('flights', flightsSchema)

module.exports = flightsModel;