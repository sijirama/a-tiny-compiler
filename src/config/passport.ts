import passport , {Strategy , Profile} from "passport"
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import UserModel, { UserDocument } from "../model/User"
import dotenv from "dotenv"
dotenv.config()

export function GoogleAuth (){
    passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL:"/auth/google/callback",
    },
    async (accessToken:string, refreshToken:string, profile:Profile, done:any) => {
        //console.log(profile)
        const newUser:Partial<UserDocument> = {
            googleId:profile.id,
            displayName:profile.displayName,
            firstName:profile.name?.givenName,
            lastName:profile.name?.familyName,
            image:profile.photos && profile.photos.length ? profile.photos[0].value : undefined
        }
        
        try {
           let user = await UserModel.findOne({googleId:profile.id})
           if(user){
               done(null,user)
           }else{
               user = await UserModel.create(newUser)
               user.save()
               console.log(user)
               done(null , user)
           }
        } catch (error) {
            console.log(error)
        }
    }))

    passport.serializeUser((user:any, done) => {
        done(null , user.id)
    })

    passport.deserializeUser( async (id, done) => {
        try {
            let user = await UserModel.findById(id)
            if(user){
                done(null , user)
                return done
            } 
            throw new Error('Failed to deserialize user');
        } catch (error) {
            throw new Error('Failed to deserialize user');
        }
    })    
}


