const allflightsModel = require("../models/allflights.model");

const allflightsControllers = {};

allflightsControllers.getallflights = async (req, res) => {

    const allflights = await allflightsModel.find();
    res.json(allflights);

};
allflightsControllers.createflight = async (req, res) => {

    const { from, to ,departure_date, arrival_date, price, airline} = req.body;
    const newflight = new allflightsModel({
        from,
        to,
        departure_date,
        arrival_date,
        price,
        airline
    });
    await newflight.save();
    res.json('Nuevo vuelo añadido');
};

allflightsControllers.searchallflights = async (req, res) => {

    const textparam = req.params.textparam;
    const allflightssearch = await allflightsModel.find({from:textparam });
    res.json(allflightssearch);

};
//from: { $regex: textparam, $options: "i" },to:{$regex: textparam, $options: "i" },departure_date:{$regex: textparam},arrival_date:{$regex: textparam},price:{$regex: textparam}, airline:{$regex: textparam, $options: "i"},

module.exports = allflightsControllers;