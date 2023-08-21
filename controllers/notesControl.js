import UserSchema from '../models/noteModel.js'

export const getPost = async(req,res)=>{
    const user =  await UserSchema.find({})
    try {
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message:error})
    }
}

export const createPost = async(req,res)=>{
    const post = req.body
    const newPost = await new UserSchema({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
       await newPost.save()
       res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json({message:error})
    }
}

export const deletePost = async(req,res)=>{
   const id=req.params.id
   
    try {
        const user =  await UserSchema.findByIdAndRemove(id)
       res.status(200).json({message:'deleted'})
    } catch (error) {
        res.status(400).json({message:error})
    }
}

export const updatePost = async(req,res)=>{
      const id=req.params.id
     try {
         const user =  await UserSchema.findByIdAndUpdate(id,req.body,{new:true})
        res.status(202).json({message:'updated'})
     } catch (error) {
         res.status(401).json({message:error})
     }
 }

 export const getById = async(req,res)=>{
    const id=req.params.id
    
     try {
         const use =  await UserSchema.findById(id);
         res.status(202).json({data:use})
     } catch (error) {
         res.status(401).json({message:error})
     }
 }

 