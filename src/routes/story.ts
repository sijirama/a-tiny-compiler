import * as Express from "express"
import { EnsureAuth, } from "../middleware/auth"
import StoryModel from "../model/Story"
import UserModel from "../model/User"

const router = Express.Router()

//NOTE: Show Add story page
//NOTE: ROUTE: GET /story/add
router.get("/add" ,EnsureAuth,  (req, res) => {
    res.render("stories/add")
})


//NOTE: Add story 
//NOTE: ROUTE: POST /stories
router.post("/" ,EnsureAuth ,  async (req, res) => {
    try{
        req.body.user = (req as any).user.id
        const story = await StoryModel.create(req.body)
        if(story){
            res.redirect("/dashboard")
        }
    }catch(error){
        console.log(error)
        res.render("error/500")
    }
})

//NOTE: Show public stories 
//NOTE: ROUTE: GET /storie
router.get("/" ,EnsureAuth, async (req, res) => {
    console.log("hitted")
   try {
        const stories = await StoryModel.find({ status:"public" }).populate("user").sort({ createdAt : "desc" }).lean().exec()
        res.render("stories/index",{
            stories
        })
   } catch (error) {
    
   } 
})








export { router }

