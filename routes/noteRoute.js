import express from "express";
import {getPost,createPost,deletePost,updatePost, getById} from '../controllers/notesControl.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/',getPost)
router.post('/',auth,createPost)
router.delete('/delete/:id',auth,deletePost)
router.patch('/update/:id',auth,updatePost);
router.get('/get/:id',auth,getById)

export default router