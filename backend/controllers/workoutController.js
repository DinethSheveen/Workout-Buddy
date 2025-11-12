import workoutModel from "../models/workoutModel.js"

export const getOneWorkout = async(req,res)=>{
    
}
export const getAllWorkouts = async(_,res)=>{
    
}
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
export const updateWorkout = async(req,res)=>{
    
}
export const deleteWorkout = async(req,res)=>{
    
}