const BookingModel = require("../models/booking.model");  
const FlightsModel = require("../models/flights.model");
const bookingController = {};

try {
    bookingController.getBookedFlights = async (req, res) => {
        const user_id = req.params.id;
        
        const searchResult = await BookingModel.find({"user_id": user_id}).populate("flight_id");
        
        if(searchResult.length === 0){
            res.send("You don't have any favorite flight");
        } else {
            const bookedFlights = searchResult.map(f => f.flight_id);
            res.json(bookedFlights);
        }
    };
} catch (error) {
    res.status(500).send(error)
}; 

try {
    bookingController.getBookings = async (req, res) => {
        const bookings = await BookingModel.find();
        res.json(bookings);
    }
} catch (error) {
    res.status(500).send(error);
}

try {
    bookingController.saveBooking = async (req, res) => {
        const booking = req.body;
    
        const bookingExists = await BookingModel.findOne({
            ...booking
        }).exec();

        if (bookingExists){
            return res.status(409).send({
                message:"Este vuelo ya reservado"
            });
        }

        const bookingSaved = await BookingModel.create({
            ...booking,
        });

        const flightseats = await FlightsModel.findByIdAndUpdate(
            { _id: booking.flight_id },
            { $inc: {
                seats: - booking.passangers
                }
            }
        );

        res.status(201).json(bookingSaved);
    };
} catch (error) {
    res.status(500).send(error);
}

module.exports = bookingController;