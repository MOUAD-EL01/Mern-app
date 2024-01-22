import { Order } from "../models/orderModel.js";
import jwt from "jsonwebtoken";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    // console.log("its worked");
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
export const getAllOrdersByUser = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    // Use find to retrieve all orders for the specified userOwner
    const orders = await Order.find({ userOwner: id });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Orders not found for the specified user" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const addOrders = async (req, res) => {
  try {
    const { ProductName, quantity, state, userOwner } = req.body;

    // Check if required fields are provided
    if (!ProductName || !quantity || !state || !userOwner) {
      return res.status(400).send({
        message: "Must fill in all fields",
      });
    }

    // Create a new order
    const newOrder = { ProductName, quantity, state, userOwner };
    const order = await Order.create(newOrder);

    return res.status(201).send(order);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
export const getOrdrById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Use the updated document as the result
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Check if the order was found and updated
    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }

    return res
      .status(200)
      .send({ message: "Order updated successfully", data: updatedOrder });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
export const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Order.findByIdAndDelete(id);

    // Check if the order was found and deleted
    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "KrAtOsOk", (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        const userRole = decoded.role;

        // You can now use 'userRole' as needed in your middleware logic
        // console.log("User Role:", userRole);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
