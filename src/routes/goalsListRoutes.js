import express from "express";
import { getGoalById, getGoalByUserId, updateGoalById } from "../controllers/goalController.js";
import { authMiddleWare } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.use(authMiddleWare);

router.get("/userGoals", getGoalByUserId);

router.get("/goal", getGoalById);

router.put("/updateGoal", updateGoalById);

router.get("/testGet", (req, res) => {
    res.json({ message: "Test successful" });
});

router.get("/", (req, res) => {
    res.json({ httpMethod: "post" });
});

router.get("/", (req, res) => {
    res.json({ httpMethod: "put" });
});

router.get("/", (req, res) => {
    res.json({ httpMethod: "delete" });
});

export default router;