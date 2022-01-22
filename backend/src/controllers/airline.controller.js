const airlineModel = require("../models/airlines.model");

// Controllers that handle routes' requests

const all = async (req, res) => {
  const airlines = await airlineModel.getAll();
  res.json(airlines);
};

const create = async (req, res) => {
  const airline = await airlineModel.create({
    ...req.body,
  });

  res.status(201).json(airline);
};

const search = async (req, res) => {
  const text = req.params.text;
  const filteredAirlines = await airlineModel.search({
    name: { $regex: text, $options: "i" },
  });
  res.json(filteredAirlines);
};

const get = async (req, res) => {
  const id = req.params.id;
  const airline = await airlineModel.findById(id);
  res.json(airline);
};

const update = async (req, res) => {
  const id = req.params.id;
  const airline = await airlineModel.updateById(id);
  res.json(airline);
};

const remove = async (req, res) => {
  const airline = await airlineModel.removeById({
    ...req.body,
  });
  res.json(airline);
};

module.exports = {
  all,
  create,
  get,
  update,
  remove,
  search,
};
