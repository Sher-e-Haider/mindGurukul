import mongoose from "mongoose";

const user =new mongoose.Schema({
    title:String,
    note: String,
    name: String,
    creator: String,
   },
{
   createdAt:{
         type:Date,
         default:new Date()
    }
      
}
      
    

)

const UserSchema = mongoose.model('UserSchema',user)

export default UserSchema