import mongoose from "mongoose"

export interface UserDocument extends mongoose.Document{
    googleId: string,
    displayName: string,
    firstName: string,
    lastName: string,
    image: string,
    createdAt:Date
}

const UserSchema = new mongoose.Schema({
    googleId:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const UserModel = mongoose.model('User', UserSchema)
export default UserModel
