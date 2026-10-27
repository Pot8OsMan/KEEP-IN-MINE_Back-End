import express from "express";
import { getGoalById } from "../controllers/goalController.js";

const router = express.Router();

router.get("/testGet", getGoalById);

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