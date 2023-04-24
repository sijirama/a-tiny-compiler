import * as Express from "express"
import { EnsureAuth, EnsureGuest } from "../middleware/auth"

const router = Express.Router()

//NOTE: Show Add story page
//NOTE: ROUTE: GET /story/add
router.get("/add" ,EnsureAuth,  (req, res) => {
    console.log("hello bitch")
    res.render("stories/add")
})


//NOTE: Add story 
//NOTE: ROUTE: POST /stories/
router.post("/" ,EnsureAuth ,  (req, res) => {
    try{
        console.log(req.body)
        res.end()
    }catch(error){
        console.log(error)
        res.render("error/500")
    }
})

export { router }

