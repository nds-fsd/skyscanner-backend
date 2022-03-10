const favoriteModel = require("../models/favorite.model");
const userModel = require("../models/user.model");
const favoriteControllers = {};

try {
    favoriteControllers.getFavFlights = async (req, res) => {
        const id = req.params.id;
        console.log(id)
        const favoritesSearch = await favoriteModel.find({user_id:id});
        console.log(favoritesSearch)
        
        if(favoritesSearch.length === 0){
            res.status(404).send("you don't have any favorite flight");
        }
         else {
            res.json(favoritesSearch);
        }
    };
} catch (error) {
    res.status(500).send(error)
}; 

//TODO:::controlador para hacer un post a favorite


module.exports = favoriteControllers;