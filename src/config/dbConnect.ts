import mongoose from "mongoose";

const MongoUri = process.env.MONGO_URI

export async function connectDB (){
    try {
        const conn = await mongoose.connect(MongoUri!)
        console.log(`Connectedd to Database: ${conn.connection.host}`)
    } catch (error) {
        console.error("Failed to connect to Database")
        process.exit(1)
    }
}


