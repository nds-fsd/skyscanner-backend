const mongoose = require("mongoose");

// Creates the schema definition, that is, the fields of a "Note" object
const serviceModelSchema = mongoose.Schema({
  title: { type: String, maxLength: 50, required: true },
  category: { type: String, },
  location: { type: String, },
  user: { type: String, },
  description: { type: String,  },
  avgRating: { type: Number, min: 0, max: 5},
  visits: { type: Number},
  imageSrc: { type: String },
  imageAlt: { type: String }
}, {
  timestamps: true
});

// Creates the model that we'll use to communicate to MongoDB
const ServiceModel = mongoose.model("service", serviceModelSchema);

// Adds functions to create, search and retrieve notes
const create = async (service) => {
  const serviceCreated = await ServiceModel.create(service);
  return serviceCreated;
};

const getAll = async () => {
  const services = await ServiceModel.find();
  return services;
};

const search = async (query) => {
  return await ServiceModel.find(query);
};

const findById = async (id) => {
  return await ServiceModel.findById(id)
}

const removeById = async (id) => {
  return ServiceModel.findByIdAndRemove(id);
};

const updateById = async (service) => {
  return await ServiceModel.updateOne(service);
};

module.exports = {
  create,
  getAll,
  search,
  findById,
  removeById,
  updateById
};
