import Express from "express"
import path from "path"
import dotenv from "dotenv"
import mongoose from "mongoose"
import morgan from "morgan"
import { engine } from 'express-handlebars';
dotenv.config()

//NOTE: import routes
import {router as IndexRouter} from "./routes/index"

//HACK: define constants
const PORT = process.env.PORT || 3000
const staticFiles = path.join(__dirname,"public")


//NOTE: import utilities
import {connectDB} from "./config/dbConnect"
connectDB()

const app = Express()

//NOTE: middleware
app.use(morgan('dev'))

//NOTE: View engine / handlebars
app.engine('.hbs', engine({defaultLayout:"main" , extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './src/views');

//NOTE: static
app.use(Express.static(staticFiles))

//NOTE: routes 
app.use("/" , IndexRouter)



mongoose.connection.once("open" , () => {
    app.listen(PORT , () => {
       console.clear()
        console.log("Connected to database")
        console.log(`Server is listening at port ${PORT}`)
    })
})
