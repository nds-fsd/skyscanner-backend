const mongoose = require("mongoose");

// Creates the schema definition, that is, the fields of a "Note" object
const airlineModelSchema = mongoose.Schema({
  name: { type: String, maxLength: 50 },
  luggage: { type: Number, },
  logoURL: { type: String, },
  color: { type: String, }
});

// Creates the model that we'll use to communicate to MongoDB
const AirlineModel = mongoose.model("airline", airlineModelSchema);

// Adds functions to create, search and retrieve notes
const create = async (airline) => {
  const airlineCreated = await AirlineModel.create(airline);
  return airlineCreated;
};

const getAll = async () => {
  const airlines = await AirlineModel.find();
  return airlines;
};

const search = async (query) => {
  return await AirlineModel.find(query);
};

const findById = async (id) => {
  return await AirlineModel.findById(id)
}

const removeById = async (id) => {
  return AirlineModel.findByIdAndRemove(id);
};

const updateById = async (airline) => {
  return await AirlineModel.updateOne(airline);
};

module.exports = {
  create,
  getAll,
  search,
  findById,
  removeById,
  updateById
};