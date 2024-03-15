import express from 'express'
import { google, signout, singIn, singUp } from '../controllers/auth.controller.js'
const router = express.Router()

router.post('/signup', singUp)
router.post('/signin', singIn)
router.post('/google', google)
router.get('/signout', signout)


export default router