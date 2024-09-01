import { Router } from "express";
import * as UserController from './controller/user.controller.js'
import vaildateSchema from "../../middelware/vaildate.js";
import { authentication } from "../../middelware/auth.js";
import roles from "../../utils/Roles.js";
import { customVaildation, uploads } from "../../utils/Multer.js";

const router=Router()

router.get('/displayProfile',authentication([roles.User]),UserController.displayProfile)
    .get('/logOut',UserController.logOut)
    .get('/confirm',UserController.confirm)
    .post('/uploadImage',authentication([roles.User]),
            uploads(customVaildation.image).single('image')
            ,UserController.aploadImage)
    .get('/displayProfile/:id',UserController.displayShareProfile)
    .get('/confirm/:token',UserController.confirmEmail)
// router.post('/logIn',UserController.logIn)

export default router