import mongoose from "mongoose";

const Authuser = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    gender:{type:String,required:true},
    howListen:{type:Array,required:true,default:[]},
    city:{type:String,required:true },
    state:{ type:String,required:true }
    
},
    {
        timeStams:true
    }
)

const User = mongoose.model('User',Authuser)
export default User