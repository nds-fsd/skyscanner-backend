const { Schema, model } = require('mongoose');

const airportSchema = new Schema({

  code: {
    type: String
  },
  name: {
    type: String,
    // required: true
  },
  city: {
    type: String,
    // required: true
  },
  country: {
    type: String,
    // required: true
  },
  airline:{type: String} /*(si relacionamos)
  [
    {
      type: 
      Schema.Types.ObjectId,
      ref:'airline'
    }
]*/
});

const Airports = model('airports', airportSchema);

module.exports = Airports;