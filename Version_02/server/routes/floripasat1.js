import express from "express";
import {
  getProducts,
  getCustomers,
  getDate,
  getGeography,
} from "../controllers/floripasat1.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;