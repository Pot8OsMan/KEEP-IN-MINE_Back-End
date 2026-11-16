import express from "express";
import { getAllByUserId, getAccomplishmemntsById } from "../controllers/accomplishmentController.js";
import { authMiddleWare } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.get("/accomplishments", getAllByUserId);

router.get("/userAccomplishments", authMiddleWare, getAccomplishmemntsById);

export default router;