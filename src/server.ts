import Express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import morgan from "morgan"
const exphbs = require("express-handlebars")

//NOTE: dotenv config
dotenv.config()
const PORT = process.env.PORT || 3000

//NOTE: import utilities
import {connectDB} from "./config/dbConnect"
connectDB()

const app = Express()

//NOTE: middleware
app.use(morgan('dev'))

//NOTE: View engine
app.engine(".hbs", exphbs({defaultLayout:"main", extname:".hbs" }))
app.set("view engine" , ".hbs")





mongoose.connection.once("open" , () => {
    app.listen(PORT , () => {
       console.clear()
        console.log("Connected to database")
        console.log(`Server is listening at port ${PORT}`)
    })
})
