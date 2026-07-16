import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },

        pickupDate: {
            type: Date,
            required: true,
        },

        returnDate: {
            type: Date,
            required: true,
        },

        pickupLocation: {
            type: String,
            required: true,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["UPI", "Credit Card", "Debit Card", "Net Banking"],
            default: "UPI",
        },

        paymentStatus: {
            type: String,
            enum: ["Paid", "Pending"],
            default: "Paid",
        },

        transactionId: {
            type: String,
        },

        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled"],
            default: "Confirmed",
        },
        paymentMethod: {
            type: String,
            enum: ["UPI", "Credit Card", "Debit Card", "Net Banking"],
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["Paid", "Pending"],
            default: "Paid",
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;