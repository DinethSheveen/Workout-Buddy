// IMPORTS
import express from "express"
import "dotenv/config"

// PORT
const PORT = process.env.PORT || 3000

// APP CONFIG
const app = express()

// MIDDLEWARE CONFIG
app.use(express.json())

// APP LISTEN
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})