import express from "express";
import { addTaskToGoal } from "../controllers/addTaskController.js";
import { getTaskById, updateTaskByGoalId } from "../controllers/taskController.js";

const router = express.Router();

router.get("/getTask", getTaskById);

router.post("/addTask", addTaskToGoal);

router.put("/updateTask", updateTaskByGoalId);

export default router;