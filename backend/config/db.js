import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async()=>{
    try {
        const mongodb_uri = process.env.MONGODB_URI
        await mongoose.connect(mongodb_uri).then(()=>{
            console.log("Database connected");
        })
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB