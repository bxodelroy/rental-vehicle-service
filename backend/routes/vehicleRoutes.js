import express from "express";
import {
    getVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
} from "../controllers/vehicleController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getVehicles);
router.get("/:id", getVehicleById);

router.post("/", protect, admin, createVehicle);
router.put("/:id", protect, admin, updateVehicle);
router.delete("/:id", protect, admin, deleteVehicle);

export default router;