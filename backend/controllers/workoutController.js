import workoutModel from "../models/workoutModel.js"

// GET WORKOUT BY ID
export const getOneWorkout = async(req,res)=>{
    const workoutId = req.params.id
    
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
    const {title,reps,load} = req.body

    if(!title || !reps || !load){
        return res.status(400).send("Please provide all the required fields")
    }

    try {
        const workout = await workoutModel.create({title,reps,load})

        res.status(201).json({msg : "Workout created",data : workout})

    } catch (error) {
        res.status(500).send(error.message)
    }
}

// UPDATE A WORKOUT BY ID
export const updateWorkout = async(req,res)=>{
    const {title,reps,load} = req.body
    const workoutId = req.params.id

    if(!title || !reps || !load){
        return res.status(400).send("Please provide all the required fields")
    }
    
    try {
        const workout = await workoutModel.findByIdAndUpdate({_id:workoutId},{title,reps,load})

        res.status(201).json({msg : "Workout updated"})

    } catch (error) {
        res.status(500).send(error.message)
    }
}

// DELETE WORKOUT BY ID
export const deleteWorkout = async(req,res)=>{
    
}