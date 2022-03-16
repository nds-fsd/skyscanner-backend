const favoriteModel = require("../models/favorite.model");  
const favoriteControllers = {};

try {
    favoriteControllers.getFavFlights = async (req, res) => {
        const user_id = req.params.id;
        
        const favoritesSearch = await favoriteModel.find({"user_id": user_id}).populate("flight_id");
        
        if(favoritesSearch.length === 0){
            res.send("You don't have any favorite flight");
        } else {
            const favFlights = favoritesSearch.map(f => f.flight_id);
            res.json(favFlights);
        }
    };
} catch (error) {
    res.status(500).send(error)
}; 

try {
    favoriteControllers.getFavs = async (req, res) => {
        const favs = await favoriteModel.find();
        res.json(favs);
    }
} catch (error) {
    res.status(500).send(error);
}

try {
    favoriteControllers.saveFav = async (req, res) => {
        const fav = req.body;
    
        const favExists = await favoriteModel.findOne({
            ...fav
        }).exec();

        if (favExists){
            return res.status(409).send({
                message:"Este vuelo ya esta guardado como favorito"
            });
        }

        const favSaved = await favoriteModel.create({
            ...fav,
        });

        res.status(201).json(favSaved);
    };
} catch (error) {
    res.status(500).send(error);
}

try {
    favoriteControllers.removeFavorite = async (req, res) => {
        const fav = req.body;
    
        const deletedFav = await favoriteModel.findOneAndDelete({
            flight_id: fav.flight_id
        }).exec();

        console.log(deletedFav);

        res.status(201).send("El vuelo ha sido elminado de favoritos correctamente");
    };
} catch (error) {
    res.status(500).send(error);
}

module.exports = favoriteControllers;