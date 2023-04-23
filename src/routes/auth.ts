import * as Express from "express"
import passport from "passport"

const router = Express.Router()

//NOTE: Auth with google
//NOTE: ROUTE: GET /auth/google
router.get("/google" , passport.authenticate("google", { scope:["profile"] }))



//NOTE: Dashboard page
//NOTE: ROUTE
router.get("/google/callback" , passport.authenticate("google" , {failureRedirect:"/"}),
    (req , res) => res.redirect("/dashboard") 
)


//NOTE: Logout 
//NOTE: ROUTE: GET /auth/Logout
router.get('/logout', function(req:Express.Request, res:Express.Response, next:Express.NextFunction) {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.redirect('/');
  });
});

export { router }
