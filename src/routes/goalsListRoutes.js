import express from "express";
import { getGoalById, getGoalByUserId, updateGoalById, removeGoalById } from "../controllers/goalController.js";
import { authMiddleWare } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.use(authMiddleWare);

router.get("/getAllGoal", getGoalByUserId);

router.get("/getGoal/:id", getGoalById);

router.put("/updateGoal/:id", updateGoalById);

router.delete("/removeGoal/:id", removeGoalById);

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