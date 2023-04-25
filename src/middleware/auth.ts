import  {Request , Response , NextFunction}  from "express";

export function EnsureAuth (req:Request , res:Response , next:NextFunction){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect("/")
    }
}

export function EnsureGuest (req:Request , res:Response , next:NextFunction){
    if(req.isAuthenticated()){
        res.redirect("/dashboard")
    }else{
        return next()
    }

}
