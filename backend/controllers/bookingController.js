import Booking from "../models/Booking.js";

export const getRentalHistory = async (req, res) => {
    try {
        const bookings = await Booking.find({
            status: {
                $in: ["Confirmed", "Cancelled"]
            }
        })
            .populate("vehicle")
            .populate("user", "name email")
            .sort({ createdAt: -1 });


        const history = bookings.map((booking) => {

            const start = new Date(booking.pickupDate);
            const end = new Date(booking.returnDate);

            const duration = Math.ceil(
                (end - start) / (1000 * 60 * 60 * 24)
            );


            return {
                bookingId: booking._id,
                vehicle: booking.vehicle.name,
                user: booking.user.name,
                email: booking.user.email,
                pickupDate: booking.pickupDate,
                returnDate: booking.returnDate,
                duration: `${duration} days`,
                totalPrice: booking.totalPrice,
                status: booking.status,
            };
        });


        res.json(history);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const createBooking = async (req, res) => {
    try {
        const booking = await Booking.create({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("vehicle")
            .populate("user", "name email");

        res.json(bookings);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        booking.status = req.body.status;

        await booking.save();

        res.json({
            message: "Booking status updated successfully",
            booking,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            user: req.user.id,
        }).populate("vehicle");

        res.json(bookings);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const cancelBooking = async (req, res) => {
    try {

        const booking = await Booking.findOne({
            _id: req.params.id,
            user: req.user.id,
        });


        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }


        booking.status = "Cancelled";

        await booking.save();


        res.json({
            message: "Booking cancelled successfully",
            booking,
        });


    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};