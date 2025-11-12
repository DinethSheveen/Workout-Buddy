import { Router } from "express";
import { getAllWorkouts, getOneWorkout, createWorkout, updateWorkout, deleteWorkout} from "../controllers/workoutController.js";

const workoutRouter = Router()

// GET - RETREIVE ALL WORKOUT
workoutRouter.get("/",getAllWorkouts)
// GET - RETREIVE A WORKOUT
workoutRouter.get("/:id",getOneWorkout)
// POST - CREATE A WORKOUT
workoutRouter.post("/",createWorkout)
// PUT - UPDATE A WORKOUT
workoutRouter.post("/:id",updateWorkout)
// DELETE - DELETE A WORKOUT
workoutRouter.delete("/:id",deleteWorkout)

export default workoutRouter