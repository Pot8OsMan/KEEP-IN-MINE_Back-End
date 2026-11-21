import express from "express";
import { addTaskToGoal } from "../controllers/addTaskController.js";
import { getAllTaskByUserId, getTaskById, updateTaskByGoalId, removetaskById } from "../controllers/taskController.js";
import { authMiddleWare } from "../middleware/authMiddleWare.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addTaskToGoalSchema } from "../validators/taskValidators.js";

const router = express.Router();

router.use(authMiddleWare);

router.get("/getAllTask", getAllTaskByUserId);

router.get("/getTask/:id", getTaskById);

router.post("/addTask", validateRequest(addTaskToGoalSchema), addTaskToGoal);

router.put("/updateTask/:id", updateTaskByGoalId);

router.delete("/removeTask/:id", removetaskById);

export default router;