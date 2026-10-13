import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Create account
router.post("/register", register);

// Authenticate account
router.post("/login", login);

export default router;