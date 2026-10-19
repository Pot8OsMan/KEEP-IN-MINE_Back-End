import express from "express";
import { register, login, logout } from "../controllers/authController.js";

const router = express.Router();

// Create account
router.post("/register", register);

// Authenticate account
router.post("/login", login);

// Authenticate account
router.post("/logout", logout);

export default router;