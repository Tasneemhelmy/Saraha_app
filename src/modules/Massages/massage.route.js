import { Router } from "express";
import * as masssageController from './controller/massage.controller.js'
import verfiyToken from "../../middelware/verfiyToken.js";
const router =Router()
router.post('/addMassage',verfiyToken,masssageController.addMassage)
router.get('/getMassages',verfiyToken,masssageController.getMassages)
router.delete('/deleteMassage/:id',verfiyToken,masssageController.deleteMassage)
export default router