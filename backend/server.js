import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Order } from "./models/orderModel.js";
import ordersRoute from "./routes/ordersRoute.js";
import usersRouter from "./routes/usersRoute.js";
import cors from "cors";

// Express app
const app = express();
app.use(express.json());

//cors policy
app.use(
  cors({
    origin: " http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Default route
app.get("/", (req, res) => {
  console.log(req);
  res.status(203).send("Welcome");
});
app.use("/orders", ordersRoute);
app.use("/auth", usersRouter);
// MongoDB Connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to the database");

    // Listen for requests
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
