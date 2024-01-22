import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    ProductName: { type: String, required: true },
    quantity: { type: Number, required: true },
    state: { type: String, required: true },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Change this line to use mongoose.model
export const Order = mongoose.model("Order", orderSchema);
