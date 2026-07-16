import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import Vehicle from "./models/Vehicle.js";
import vehicles from "./data/vehicles.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Vehicle.deleteMany();

    await Vehicle.insertMany(vehicles);

    console.log("Vehicles Imported Successfully!");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

importData();