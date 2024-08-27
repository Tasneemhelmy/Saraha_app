import { Router } from "express";
import * as authController from './controller/auth.controller.js'
const router =Router()
router.get('/signUp',authController.signUpDisblay)
    .post('/signUp',authController.signUp)
    .get('/logIn',authController.loginDisblay)
    .post('/logIn',authController.logIn)

export default router