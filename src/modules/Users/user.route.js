import { Router } from "express";
import * as UserController from './controller/user.controller.js'
import { userSchema } from "./controller/userSchema.js";
import vaildateSchema from "../../middelware/vaildate.js";

const router=Router()

router.post('/addUser',vaildateSchema(userSchema),UserController.signUp)
router.patch('/confirm',UserController.confirmEmail)
router.post('/logIn',UserController.logIn)

export default router