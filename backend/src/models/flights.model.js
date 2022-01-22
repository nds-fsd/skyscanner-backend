const {Schema, model} = require("mongoose");

const flightsSchema = new Schema({

    from: { type: String},
      /*[{
      type:Schema.Types.ObjectId,
      ref:'airports',
      
      }],*/
    to: { type: String},/*{
      type:Schema.Types.ObjectId,
      ref:'airports',
      },*/
    dedate: { type: Date}, //type: Date o crear un campo hora
    arrdate: {type: Date}, //type: Date o crear un campo hora
    price: {type: Number},
    airline: { type: String},/*[{ 
      type:Schema.Types.ObjectId,
      ref:'airline',}]*/
      
});


const flightsModel = model('flights', flightsSchema)

module.exports = flightsModel;