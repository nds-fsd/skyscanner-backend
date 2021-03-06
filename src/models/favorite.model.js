const mongoose = require ('mongoose');
const favoriteSchema = new mongoose.Schema({
    flight_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "flights"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});


const favorite = mongoose.model("favorite", favoriteSchema);
module.exports = favorite;
