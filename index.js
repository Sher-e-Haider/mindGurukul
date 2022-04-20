import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "mongoose";
import bodyParser from 'body-parser'
import Router from './routes/noteRoute.js'
import AuthUser from './routes/authRouter.js'


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use('/auth',AuthUser)
app.get('/',(req,res)=>{
    res.send('App is running for me')
})
app.use('/api',Router)

const PORT = process.env.PORT||5000
mongoose.connect(process.env.MONGODB_URI,{              
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`connected at http://localhost:${PORT}`);
    })
}).catch((error)=>{
   console.log(error.meaasge);
})



