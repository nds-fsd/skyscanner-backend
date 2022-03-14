const mongoose = require ('mongoose');
const bookingSchema = new mongoose.Schema({
    flight_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "flights"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    passangers: {
        type: mongoose.Schema.Types.Number,
        default: 1
    }
});

const booking = mongoose.model("booking", bookingSchema);
module.exports = booking;
