import Express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

//NOTE: dotenv config
dotenv.config()
const PORT = process.env.PORT || 3000

//NOTE: import utilities
import {connectDB} from "./config/dbConnect"
connectDB()

const app = Express()



mongoose.connection.once("connection" , () => {
    app.listen(PORT , () => {
       console.clear()
        console.log("Connected to database")
        console.log(`Server is listening at port ${PORT}`)
    })
})
