import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All cart routes require login
router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update/:itemId", protect, updateCartItem);
router.delete("/:itemId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);


export default router;
