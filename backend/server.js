// IMPORTS
import express from "express"
import cors from "cors"
import "dotenv/config"
import workoutRouter from "./routes/workoutRoute.js"
import connectDB from "./config/db.js"

// PORT
const PORT = process.env.PORT || 3000

// APP CONFIG
const app = express()

// MIDDLEWARE CONFIG
app.use(express.json())
app.use(cors())

// ROUTER CONFIG
app.use("/api/workouts",workoutRouter)

// APP LISTEN
app.listen(PORT,async()=>{
    await connectDB()
    console.log(`Server running on http://localhost:${PORT}`);
})