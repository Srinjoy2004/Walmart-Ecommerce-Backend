import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

// User's own orders
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// Admin-only: get all orders
router.get("/", protect, getAllOrders);

export default router;
