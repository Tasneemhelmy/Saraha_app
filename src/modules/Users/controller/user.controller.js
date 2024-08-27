import bcryptjs from 'bcryptjs'
import jwt from'jsonwebtoken'
import { customAlphabet } from "nanoid"

import User from "../../../../database/models/user.model.js"
import asyncHandler from "../../../middelware/asyncHandller.js"
import AppError from "../../../utils/Error.js"
import sendEmail from '../../../utils/sendEmail.js'


export const displayProfile=async(req,res,next)=>{
        return res.render('profile',{
        css:'../shared/Css/signUp.css',
        js:'../shared/Js/signUp.js',
        title:'Profile',
        user:req.session?.user
    })
}


                       //ConfirmEmail
export const confirmEmail=asyncHandler(async(req,res,next)=>{
            const {email,OTP}=req.body
            if(!OTP) return res.status(400).json({message:"You must Enter The Code 😤"})
        
            const confirm= await User.findOneAndUpdate({email,OTP},{confirmEmail:true,OTP:null})  
            if(!confirm) return res.status(400).json({message:"Invaild Email Or code"})
                res.status(200).json({message:"Email Confirmed👏🏻"})
        
        })
//-------------------------------------------------------------------------------------------------------------------------

