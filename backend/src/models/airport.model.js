const { Schema, model } = require('mongoose');

const airportSchema = new Schema({

  code: {
    type: String
  },
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String
  }
});

const Airports = model('airport', airportSchema);

module.exports = Airports;