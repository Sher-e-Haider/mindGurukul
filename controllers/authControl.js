import User from '../models/authModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { decrypt, encrypt, generateToken } from '../utils.js'

export const signin = async(req,res)=>{
    const {email,password} = req.body

     try {
        const isUserExist = await User.findOne({email})
        if(!isUserExist) return res.status(404).json({message:'User not found'})
         
        const isPassword = await bcrypt.compare(password,isUserExist.password)
        if(!isPassword) return res.status(400).json({message:'Password id not correct'})

        const token = jwt.sign({name:isUserExist.name ,email:isUserExist.email,id:isUserExist._id},'test',{expiresIn:'30d'})
        res.status(201).json({result:isUserExist,token})


    } catch (error) {
        res.status(500).json({message:'Something wrong'})
    }
}



export const signup = async(req,res)=>{
    try {
        const olduser = await User.findOne({email:req.body.email})
    if(olduser){
        return res.status(404).json({message:`User alredy exists by this ${req.body.email}`})
    }
    
    const hashedPassword = await bcrypt.hash(req.body.password,12)
    const newUser = await  User.create({ 
        ...req.body,
        password:hashedPassword,
        phone:encrypt(req.body.phone)
     })
    // await newUser.save()
    res.send({
        result:newUser,
        token:generateToken(newUser),
        message:"User created successfully"
    })
        
    } catch (error) {
        res.status(501).send({message:error.message})
    }
}


export const getUsers = async(req,res)=>{
   try {
     const users = await User.find({},(err,data)=>{
        if (err) {
            console.error(err);
            return;
        }
       
       const modifiedData = data.map(x=>{
            if(x.phone){
              return { name:x.name,
                  email:x.email,
                 password:x.password,
                 phone:x.phone,
                 gender:x.gender,
                 howListen:x.howListen,
                 city:x.city,
                 state:x.state,
                 phone:decrypt(x.phone),
                 
                }
                
              
               
            }
       
        })
        return res.status(200).send(modifiedData)
     });
     //console.log(users);
   } catch (error) {
    //return res.status(501).send({message:error.message})
   }
}