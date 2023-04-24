import * as Express from "express"

const router = Express.Router()

//NOTE: Show Add story page
//NOTE: ROUTE: GET /story/add
router.get("/add" , (req, res) => {
    res.render("add")
})



export { router }

