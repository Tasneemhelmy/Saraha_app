import bcryptjs from 'bcryptjs'
import jwt from'jsonwebtoken'
import { customAlphabet } from "nanoid"

import User from "../../../../database/models/user.model.js"
import asyncHandler from "../../../middelware/asyncHandller.js"
import AppError from "../../../utils/Error.js"
import sendEmail from '../../../utils/sendEmail.js'


export const displayProfile=async(req,res,next)=>{
    const user= await User.findById(req.session.user.id)
        return res.render('profile',{
        css:'../shared/Css/signUp.css',
        js:'../shared/Js/signUp.js',
        title:'Profile',
        user
    })  
}  

export const logOut=async(req,res,next)=>{
    const {id}=req.session.user
    await User.updateOne({_id:id},{status:"Offline"})
    return res.redirect('/auth/logIn')
}

export const aploadImage=async(req,res,next)=>{
    const {id}=req.session.user
    req.body.image=req.file?.filename
    const user=await User.findById(id)
    user.image= req.body.image
    await user.save()
    res.redirect('/user/displayProfile')
    

}

export const confirm=async(req,res,next)=>{
    return res.render('confirm',{
    css:'../shared/Css/signUp.css',
    js:'../shared/Js/signUp.js',
    title:'confirmYourEmail',
})  
}  

                       //ConfirmEmail
export const confirmEmail=async(req,res,next)=>{
    const {token}=req.params
    const payload=jwt.verify(token,process.env.TOKEN_KEY)
        await User.updateOne({email:payload.email},{confirmEmail:true})
        return res.redirect('/auth/logIn')

        }
//-------------------------------------------------------------------------------------------------------------------------

