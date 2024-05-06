import express from "express";
import {
  getBattery,
} from "../controllers/floripasat1.js";

const router = express.Router();

router.get("/battery", getBattery);

export default router;