
import * as Express from "express"


const router = Express.Router()


//NOTE: Login / landing page
//NOTE: ROUTE
router.get("/" , (req , res) => {
    console.log("////////////////////////////")
    res.render("login")
})


//NOTE: Dashboard page
//NOTE: ROUTE
router.get("/dashboard" , (req , res) => {
    console.log("////////////////////////////")
    res.render("dashboard")
})




export { router }
