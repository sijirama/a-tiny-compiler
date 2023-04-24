import * as Express from "express"
import { EnsureAuth, } from "../middleware/auth"
import StoryModel from "../model/Story"

const router = Express.Router()

//NOTE: Show Add story page
//NOTE: ROUTE: GET /story/add
router.get("/add" ,EnsureAuth,  (req, res) => {
    console.log("hello bitch")
    res.render("stories/add")
})


//NOTE: Add story 
//NOTE: ROUTE: POST /stories/
router.post("/" ,EnsureAuth ,  async (req, res) => {
    try{
        req.body.user = (req as any).user.id
        console.log(req.body)
        const story = await StoryModel.create(req.body)
        if(story){
            console.log(story)
            res.redirect("/dashboard")
        }
    }catch(error){
        console.log(error)
        res.render("error/500")
    }
})

export { router }

