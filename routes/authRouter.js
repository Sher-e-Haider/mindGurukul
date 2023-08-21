import express from 'express'
import { getUsers, signin,signup } from '../controllers/authControl.js'

const app = express()
const router = express.Router()

router.post('/signin',signin)
router.post('/signup',signup)
router.get('/users',getUsers)

export default router