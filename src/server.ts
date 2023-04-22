import Express from "express"
import path from "path"
import dotenv from "dotenv"
import mongoose from "mongoose"
import morgan from "morgan"
import passport from "passport"
import session from "express-session"
import { engine } from 'express-handlebars';
dotenv.config()

//NOTE: import routes
import {router as IndexRouter} from "./routes/index"

//HACK: define constants
const PORT = process.env.PORT || 3000
const staticFiles = path.join(__dirname,"public")
const expressSessionSecret = process.env.EXPRESS_SESSION_SECRET

//NOTE: import utilities
import {connectDB} from "./config/dbConnect"
connectDB()

const app = Express()

//NOTE: middleware
app.use(morgan('dev'))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: String(expressSessionSecret) ,
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())

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
        //console.log(expressSessionSecret)
        console.log("Connected to database")
        console.log(`Server is listening at port ${PORT}`)
    })
})
