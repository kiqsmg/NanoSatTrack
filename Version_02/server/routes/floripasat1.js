import express from "express";
// import getLocation, bellow
import {
  getBattery,
  getDownlink,
} from "../controllers/floripasat1.js";

const router = express.Router();

router.get("/battery", getBattery);
router.get("/downlink", getDownlink);
router.get("/solarpanel", getDownlink);
//router.get("/location", getLocation);



export default router;