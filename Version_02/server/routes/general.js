import express from "express";
import { getSatellite } from "../controllers/general.js";


const router = express.Router();

router.get("/satellite", getSatellite);

export default router;