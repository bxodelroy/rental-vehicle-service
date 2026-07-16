import express from "express";
import {
    createBooking,
    getBookings,
    getMyBookings,
    cancelBooking,
    updateBookingStatus,
    getRentalHistory,
} from "../controllers/bookingController.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getBookings);
router.get(
    "/history",
    protect,
    admin,
    getRentalHistory
);
router.get("/my", protect, getMyBookings);
router.post("/", protect, createBooking);
router.put("/:id/cancel", protect, cancelBooking);
router.put(
    "/:id/status",
    protect,
    admin,
    updateBookingStatus
);

export default router;