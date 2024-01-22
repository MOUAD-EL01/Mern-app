import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { register, login, getUserById } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/getUser/:id", getUserById);
export default router;
