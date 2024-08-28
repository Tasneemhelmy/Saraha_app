import { Router } from "express";
import * as UserController from './controller/user.controller.js'
import { userSchema } from "../userSchema.js";
import vaildateSchema from "../../middelware/vaildate.js";

const router=Router()

router.get('/displayProfile',UserController.displayProfile)
    .get('/logOut',UserController.logOut)
    .get('/confirm',UserController.confirm)
    .get('/confirm/:token',UserController.confirmEmail)
// router.post('/logIn',UserController.logIn)

export default router