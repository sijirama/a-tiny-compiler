import * as Express from "express"
import { EnsureGuest } from "../middleware/auth"

const router = Express.Router()

//NOTE: Show Add story page
//NOTE: ROUTE: GET /story/add
router.get("/add" ,EnsureGuest ,  (req, res) => {
    res.render("stories/add")
})



export { router }

