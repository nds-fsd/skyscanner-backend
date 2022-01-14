const {Schema, model} = require("mongoose");

const allflightsSchema = new Schema({
  from: { type: String},
  to:{ type: String},
  departure_date: { type: Date},
  arrival_date: {type: Date},
  price: {type: Number},
  airline:{type: String} /*(si relacionamos)[
    {
        type: 
        Schema.Types.ObjectId,
        ref:'airline'
    }
]*/
});
const allflightsModel = model('allflights', allflightsSchema)
module.exports = allflightsModel;
