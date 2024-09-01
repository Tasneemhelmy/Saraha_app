import { Router } from "express";
import * as masssageController from './controller/massage.controller.js'
import { authentication } from "../../middelware/auth.js";
import roles from "../../utils/Roles.js";
const router =Router()
router.get('/displayMessage',authentication([roles.User]),masssageController.displayMessage)
router.post('/addMessage/:id',masssageController.addMassage)
router.get('/deleteMessage/:id',authentication([roles.User]),masssageController.deleteMassage)
export default router     