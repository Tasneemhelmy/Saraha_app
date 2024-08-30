import { Router } from "express";
import * as authController from './controller/auth.controller.js'
import vaildateSchema from "../../middelware/vaildate.js";
import { loginSchema, userSchema } from "./authSchema.js";
const router =Router()
router.get('/signUp',authController.signUpDisblay)
    .post('/signUp',vaildateSchema(userSchema,'signUp'),authController.signUp)
    .get('/logIn',authController.loginDisblay)
    .post('/logIn',vaildateSchema(loginSchema,'logIn'),authController.logIn)

export default router