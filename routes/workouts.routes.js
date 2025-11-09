import { Router } from "express";
import { listWorkouts, createWorkout, updateWorkout, deleteWorkout } from "../controllers/workouts.controller.js";
import { validateWorkout } from "../middleware/validation.js";

const router = Router();
router.get("/", listWorkouts);   
router.post("/", validateWorkout, createWorkout); 
router.put("/:id", validateWorkout, updateWorkout);
router.delete("/:id", deleteWorkout);
export default router;
