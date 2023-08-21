import mongoose from "mongoose";

const user =new mongoose.Schema({
    userName:String,
    email: String,
    phone: String,
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