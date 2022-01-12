const serviceModel = require("../models/services.model");

// Controllers that handle routes' requests

const all = async (req, res) => {
  const services = await serviceModel.getAll();
  res.json(services);
};

const create = async (req, res) => {
  const service = await serviceModel.create({
    ...req.body,
  });

  res.status(201).json(service);
};

const search = async (req, res) => {
  const text = req.params.text;
  const filteredServices = await serviceModel.search({
    name: { $regex: text, $options: "i" },
  });
  res.json(filteredServices);
};

const get = async (req, res) => {
  const id = req.params.id;
  const service = await serviceModel.findById(id);
  res.json(service);
};

const update = async (req, res) => {
  const id = req.params.id;
  const service = await serviceModel.updateById(id);
  res.json(service);
};

const remove = async (req, res) => {
  const service = await serviceModel.removeById({
    ...req.body,
  });
  res.json(service);
};

module.exports = {
  all,
  create,
  get,
  update,
  remove,
  search,
};
