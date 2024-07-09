import bcryptjs from 'bcryptjs'
import jwt from'jsonwebtoken'
import { customAlphabet } from "nanoid"

import User from "../../../../database/models/user.model.js"
import asyncHandler from "../../../middelware/asyncHandller.js"
import AppError from "../../../utils/Error.js"
import sendEmail from '../../../utils/sendEmail.js'


                //1. User Registration:
export const signUp=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body
    const userExist=await User.findOne({email})
    if(userExist)
        return next(new AppError('User Aready Exist🤐',409))

    //sendEmail({})
    const hashPass=bcryptjs.hashSync(password,9)
    req.body.password=hashPass
    const randomNumber=customAlphabet('0123456789',4)
    req.body.OTP=randomNumber()
    const user=await User.insertMany(req.body)
    sendEmail({to:email,html:`<h1>${req.body.OTP}</h1>`})

    res.status(200).json({massage:"signUp Successfully🤯",user})

})
//-----------------------------------------------------------------

                //2. User Login:
export const logIn=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body
    const userExist=await User.findOne({email})

    if(!userExist)
        return next(new AppError('Please signUp First😤',404))
    if(!userExist.confirmEmail)
        return next(new AppError('Please Confirm Your Email😤',400))

    const isMatch=bcryptjs.compareSync(password,userExist.password)
    if(!isMatch)
        return next(new AppError('Invaild Email Or Password😤',400))

    const token=jwt.sign({email,_id:userExist._id},'secret')
    res.status(200).json({massage:"Login Successfully😎",token})

})
//-------------------------------------------------------------------

                       //ConfirmEmail
export const confirmEmail=asyncHandler(async(req,res,next)=>{
            const {email,OTP}=req.body
            if(!OTP) return res.status(400).json({message:"You must Enter The Code 😤"})
        
            const confirm= await User.findOneAndUpdate({email,OTP},{confirmEmail:true,OTP:null})
            if(!confirm) return res.status(400).json({message:"Invaild Email Or code"})
                res.status(200).json({message:"Email Confirmed👏🏻"})
        
        })
//-------------------------------------------------------------------------------------------------------------------------

