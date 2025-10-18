import { Router } from "express";
import testRoutes from "./test.routes.js";
import workoutsRoutes from "./workouts.routes.js";

const router = Router();

router.use("/test", testRoutes);         
router.use("/workouts", workoutsRoutes); 

export default router;
