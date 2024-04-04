import express from "express";
import { getSatellite } from "../controllers/general.js";

const router = express.Router();

router.get("/satellite", getSatellite);
router.get("/dashboard", getDashboardStats);

export default router;