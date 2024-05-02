import express from "express";
import { getBattery } from "../controllers/battery.js";

const router = express.Router();

router.get("/battery", getBattery);

export default router;