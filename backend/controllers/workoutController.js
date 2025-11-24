import { Types } from "mongoose"
import workoutModel from "../models/workoutModel.js"
import userModel from "../models/userModel.js"

// GET WORKOUT BY ID
export const getOneWorkout = async(req,res)=>{
    const workoutId = req.params.id
    
    if(!workoutId){
        return res.status(400).json("Missing workout id")
    }

    if(!Types.ObjectId.isValid(workoutId)){
        return res.status(400).json("No workout with this id")
    }

    try {
        const workout = await workoutModel.findById(workoutId)

        res.status(200).json({msg : "Workout retreived",data:workout})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// GET ALL WORKOUTS 
export const getAllWorkouts = async(req,res)=>{
    try {
        const userId = req.params.id

        const workout = await workoutModel.find({user:userId})

        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// CREATE A WORKOUT 
export const createWorkout = async(req,res)=>{
    const {title,reps,load,user} = req.body

    if(!title || !reps || !load){
        return res.status(400).json("Please provide all the required fields")
    }

    // REPS VALIDATION
    const parsedRep = parseInt(reps)

    if(isNaN(parsedRep)){
        return res.status(400).json("Reps should be a numberic value")
    }

    // LOAD VALIDATION
    const parsedLoad = parseInt(load)

    if(isNaN(parsedLoad)){
        return res.status(400).json("Load should be a numeric value")
    }

    try {
        const workout = await workoutModel.create({title,reps : parsedRep,load:parsedLoad,user})

        const loggedUser = await userModel.findById(user)
        
        await loggedUser.workouts.push(workout._id);
        await loggedUser.save()

        res.status(201).json("Workout created successfully")

    } catch (error) {
        res.status(500).json(error.message)
    }
}

// UPDATE A WORKOUT BY ID
export const updateWorkout = async(req,res)=>{
    const {title,reps,load} = req.body
    const workoutId = req.params.id

    if(!title || !reps || !load){
        return res.status(400).json("Please provide all the required fields")
    }

    if(!Types.ObjectId.isValid(workoutId)){
        return res.status(400).json("No workout with this id")
    }
    
    try {
        const workout = await workoutModel.findByIdAndUpdate({_id:workoutId},{title,reps,load})

        res.status(201).json("Workout updated")

    } catch (error) {
        res.status(500).json(error.message)
    }
}

// DELETE WORKOUT BY ID
export const deleteWorkout = async(req,res)=>{
    const workoutId = req.params.id

    if(!workoutId){
        return res.status(400).json("Missing workout id")
    }

    if(!Types.ObjectId.isValid(workoutId)){
        return res.status(400).json("No workout with this id")
    }

    try {
        const workout = await workoutModel.findByIdAndDelete({_id:workoutId})
        res.status(200).json("Workout Deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
}