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
router.get("/dashboard" , EnsureAuth , async (req:any , res) => {
    console.log("hello")
    try {
        const stories = await StoryModel.find({user:req.user.id}).lean()
        console.log(req.user.id , "==========User id")
        console.log(stories  )
        res.render("dashboard" , {
            name : req.user.firstName,
            stories
        })
    } catch (error:any) {
       console.log(error.message) 
       res.render("error/500")
    }
})

export { router }
