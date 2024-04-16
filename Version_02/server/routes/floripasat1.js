import express from "express";
import {
  getDate,
} from "../controllers/floripasat1.js";

const router = express.Router();

router.get("/date", getDate);
//router.get("/customers", getCustomers);
//router.get("/transactions", getTransactions);

export default router;