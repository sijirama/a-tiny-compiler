import passport from "passport"
import {Strategy} from "passport-google-oauth20"
import UserModel from "../model/User"
import dotenv from "dotenv"
dotenv.config()

export function GoogleAuth (){
    passport.use(new Strategy({
        clientID:process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL:"/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
    }))

    passport.serializeUser(function (user, done) {
        done(null , user.id)
    })

    
}


