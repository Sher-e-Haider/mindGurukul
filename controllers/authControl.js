import User from '../models/authModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils.js'
//import { generateToken } from '../utils.js'

export const signin = async(req,res)=>{
    const {email,password} = req.body

     try {
        const isUserExist = await User.findOne({email})
        if(!isUserExist) return res.status(404).json({message:'user not found'})
         
        const isPassword = await bcrypt.compare(password,isUserExist.password)
        if(!isPassword) return res.status(400).json({message:'password id not correct'})

        const token = jwt.sign({name:isUserExist.name ,email:isUserExist.email,id:isUserExist._id},'test',{expiresIn:'30d'})
        res.status(201).json({result:isUserExist,token})


    } catch (error) {
        res.status(500).json({message:'something wrong'})
    }
}

// export const signup = async(req,res)=>{
//     const {name,email,password} = req.body

//        try {
          
//           const oldUserExist = await User.findOne({email})
//         if(oldUserExist) return res.status(400).json({message:'user already exists'})
         
//         const hashedPassword= await bcrypt.hash(password,12)
//        if(password!==confirmPassword) return res.status(404).json({message:'password and confirmPassword is not match'})

//         const result = await User.create({name,email,password:hashedPassword})

//         const token = jwt.sign({email:result.email,id:result._id},'test',{expiresIn:'30d'})
//         res.status(201).json({result,token})

      
//       }catch(error){
//           res.status(500).json({message:'something wrong'})
//       }
        
// }


export const signup = async(req,res)=>{
    const { firstname,lastname, email,password} = req.body
    const olduser = await User.findOne({email})
    if(olduser){
        return res.status(404).json({message:`user alredy exists by this ${email}`})
    }
    
    const hashedPassword = await bcrypt.hash(password,12)
    const newUser = await  User.create({ name:`${firstname} ${lastname}`,email,password:hashedPassword })
    // await newUser.save()
    res.send({
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        isAdmin:newUser.isAdmin,
        token:generateToken(newUser)
    })
        
}


// import User from '../models/authModel.js'
// import bcrypt from 'bcryptjs'
// import { generateToken } from '../utils.js'

// export const signin = async(req,res)=>{
//     const { email,password } = req.body
//     const olduser = await User.findOne({email})
//     const isPassword = await bcrypt.compare(password,olduser.password)
//     if(!isPassword) return res.status(400).json({message:'password id not correct'})

//     if(olduser){
//         if(bcrypt.compare(password,olduser.password)){ 
//             res.send({

//                 _id:olduser._id,
//                 name:olduser.name,
//                 email:olduser.email,
//                 isAdmin:olduser.isAdmin,
//                 token:generateToken(olduser)
//             })
//             return
//         }
        
//     }else{
//         res.status(401).json({message:"invali email or password"})
//     }
// }

// export const signup = async(req,res)=>{
//     const { firstname,lastname, email,password } = req.body
//     const olduser = await User.findOne({email})
//     if(olduser){
//         return res.status(404).json({message:`user alredy exists by this ${email}`})
//     }
//     const hashedPassword = await bcrypt.hash(password,12)
//     const newUser = await  User.create({ name:`${firstname} ${lastname}`,email,password:hashedPassword })
//     // await newUser.save()
//     res.send({
//         _id:newUser._id,
//         name:newUser.name,
//         email:newUser.email,
//         isAdmin:newUser.isAdmin,
//         token:generateToken(newUser)
//     })
        
// }