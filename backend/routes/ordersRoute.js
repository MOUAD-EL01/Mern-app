import express from "express";
import { Order } from "../models/orderModel.js";
import { verifyToken } from "../controllers/orderController.js";
import {
  getAllOrders,
  addOrders,
  getOrdrById,
  updateOrder,
  deleteOrderById,
  getAllOrdersByUser,
} from "../controllers/orderController.js";
const router = express.Router();

// Create new order
router.post("/", verifyToken, addOrders);

// Get all orders
router.get("/", verifyToken, getAllOrders);
//getOrderByUser
router.get("/UserOrder/:id", verifyToken, getAllOrdersByUser);

// Get order by ID
router.get("/:id", verifyToken, getOrdrById);

// Update order by ID
router.put("/:id", verifyToken, updateOrder);

// Delete order by ID
router.delete("/:id", verifyToken, deleteOrderById);

export default router;
