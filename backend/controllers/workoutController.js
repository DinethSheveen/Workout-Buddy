import workoutModel from "../models/workoutModel.js"

// GET WORKOUT BY ID
export const getOneWorkout = async(req,res)=>{
    const {workoutId} = req.params
    
    if(!workoutId){
        return res.status(400).send("Missing workout id")
    }

    try {
        const workout = await workoutModel.findById(workoutId)

        res.status(200).json({msg : "Workout retreived",data:workout})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// GET ALL WORKOUTS 
export const getAllWorkouts = async(_,res)=>{
    try {
        const workout = await workoutModel.find()

        res.status(200).json({msg : "All workouts retreived",data:workout})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// CREATE A WORKOUT 
export const createWorkout = async(req,res)=>{
    try {
        const {title,reps,load} = req.body

        if(!title || !reps || !load){
            return res.status(400).send("Please provide all the required fields")
        }

        const workout = await workoutModel.create({title,reps,load})

        res.status(201).json({msg : "Workout created",data : workout})

    } catch (error) {
        res.status(500).send(error.message)
    }
}

// UPDATE A WORKOUT BY ID
export const updateWorkout = async(req,res)=>{
    
}

// DELETE WORKOUT BY ID
export const deleteWorkout = async(req,res)=>{
    
}