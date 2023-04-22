import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const MongoUri = process.env.MONGO_URI

export async function connectDB (){
    try {
        const conn = await mongoose.connect(MongoUri!)
        console.log(`Connected to Database: ${conn.connection.host}`)
    } catch (error) {
        console.error("Failed to connect to Database")
        process.exit(1)
    }
}


