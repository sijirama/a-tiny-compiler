import mongoose from "mongoose"
import UserModel from "./User"

export interface StoryDocument extends mongoose.Document{
    googleId: string,
    displayName: string,
    firstName: string,
    lastName: string,
    image: string,
    createdAt:Date
}

const StorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    body:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'public',
        enum:["public" , "private"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:UserModel
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const StoryModel = mongoose.model('Story', StorySchema)
export default StoryModel
