import * as Express from "express"
import { EnsureAuth , EnsureGuest } from "../middleware/auth"

const router = Express.Router()

//NOTE: Login / landing page
//NOTE: ROUTE
router.get("/" , EnsureGuest ,  (req , res) => {
    console.log("////////////////////////////")
    res.render("login" , {
        layout:"login"
    })
})


//NOTE: Dashboard page
//NOTE: ROUTE
router.get("/dashboard" , EnsureAuth ,  (req , res) => {
    console.log("////////////////////////////")
    res.render("dashboard")
})

export { router }
