import { Router } from "express";
import { listWorkouts, createWorkout } from "../controllers/workouts.controller.js";

const router = Router();
router.get("/", listWorkouts);   
router.post("/", createWorkout); 
export default router;
