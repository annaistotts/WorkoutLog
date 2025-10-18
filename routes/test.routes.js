import { Router } from "express";
const router = Router();

// Simple endpoints to prove server works
router.get("/", (req, res) => res.json({ message: "GET works!" }));
router.post("/", (req, res) => res.status(201).json({ youSent: req.body || null }));

export default router;
