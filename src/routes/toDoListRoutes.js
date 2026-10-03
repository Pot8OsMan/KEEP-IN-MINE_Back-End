import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({message: "Test successful"});
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