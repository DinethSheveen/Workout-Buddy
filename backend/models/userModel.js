import mongoose, { Types } from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    workouts : [
        {
            type : Types.ObjectId,
            ref : "workout"
        }
    ]
},{timestamps:true})

const userModel = mongoose.model("user",userSchema)

export default userModel