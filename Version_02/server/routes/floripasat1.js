import express from "express";
import {
  getBattery,
  getDownlink
} from "../controllers/floripasat1.js";

const router = express.Router();

router.get("/battery", getBattery);
router.get("/downlink", getDownlink);


export default router;