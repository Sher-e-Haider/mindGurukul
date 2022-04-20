import express from "express";
import {getPost,createPost,deletePost,updatePost} from '../controllers/notesControl.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/',getPost)
router.post('/',auth,createPost)
router.delete('/delete/:id',auth,deletePost)
router.patch('/update/:id',auth,updatePost)

export default router