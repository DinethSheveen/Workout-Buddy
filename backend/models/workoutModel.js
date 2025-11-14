import mongoose, { Types } from "mongoose";

const workoutSchema = mongoose.Schema({
    title : {
        type : String,
        required : true 
    },
    reps : {
        type : Number,
        required : true 
    },
    load : {
        type : Number,
        required : true 
    },
    user : {
        type : Types.ObjectId,
        ref : "user",
        required : true
    }
},{timestamps:true})

const workoutModel = mongoose.model("workout",workoutSchema)

export default workoutModel