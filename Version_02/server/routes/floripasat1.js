import express from "express";
import {
  getDownlink,
  getLocation,
} from "../controllers/floripasat1.js";

const router = express.Router();

router.get("/downlink", getDownlink);
router.get("/location", getLocation);



export default router;