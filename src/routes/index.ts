import * as Express from "express"
import { EnsureAuth , EnsureGuest } from "../middleware/auth"
import StoryModel from "../model/Story"

const router = Express.Router()

//NOTE: Login / landing page
//NOTE: ROUTE
router.get("/" , EnsureGuest ,  (req , res) => {
    res.render("login" , {
        layout:"login"
    })
})


//NOTE: Dashboard page
//NOTE: ROUTE
router.get("/dashboard" , EnsureAuth ,  (req:any , res) => {
    res.render("dashboard" , {
        name : req.user.firstName  ,
    })
})

export { router }
