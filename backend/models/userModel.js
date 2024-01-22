import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date },
    role: { type: String, default: "user", immutable: true },
  },
  {
    timestamps: true,
  }
);

// Change this line to use mongoose.model
export const User = mongoose.model("User", userSchema);
