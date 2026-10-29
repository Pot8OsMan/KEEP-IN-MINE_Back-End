import express from "express";
import { addTaskToGoal } from "../controllers/addTaskController.js";

const router = express.Router();

router.post("/addTask", addTaskToGoal);

export default router;