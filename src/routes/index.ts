
import * as Express from "express"


const router = Express.Router()


//NOTE: Login / landing page
//NOTE: ROUTE
router.get("/" , (req , res) => {
    res.send("Login")
})


//NOTE: Dashboard page
//NOTE: ROUTE
router.get("/dashboard" , (req , res) => {
    res.send("Dashboard")
})




export { router }
