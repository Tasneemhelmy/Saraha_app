import User from "../../../../database/models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from'jsonwebtoken'
import { customAlphabet } from "nanoid"
import sendEmail, { createHtml } from "../../../utils/sendEmail.js"
import session from "express-session"



export const signUpDisblay=(req,res,next)=>{
    //console.log(req.flash('error')[0])
    req.session.destroy()
    return res.render('signUp',{
        css:'../shared/Css/signUp.css',
        js:'../shared/Js/signUp.js',
        title:'signUp',
        error:"",
        data:{}   
    })  

} 




export const signUp=async(req,res,next)=>{
    const {email,password}=req.body
    const userExist=await User.findOne({email})
    if(userExist){
        //req.flash('error','User Already Has an Account🤐')
        return res.render('signUp',{
            css:'../shared/Css/signUp.css',
            js:'../shared/Js/signUp.js',
            title:'signUp',
            error:"User Already Has an Account🤐",
            data:req.body
        })
    }  

    //sendEmail({})
    const hashPass=bcryptjs.hashSync(password,9)
    req.body.password=hashPass
    const randomNumber=customAlphabet('0123456789',4)
    req.body.OTP=randomNumber()
    const user=await User.insertMany(req.body)
    const emailToken=jwt.sign({email},process.env.TOKEN_KEY)
    const html=createHtml(emailToken)
    sendEmail({to:email,html})
    return res.redirect('/user/confirm')
}
//-----------------------------------------------------------------



export const loginDisblay=(req,res,next)=>{
    req.session.destroy()
    return res.render('logIn',{
        css:'../shared/Css/signUp.css',
        js:'../shared/Js/signUp.js',
        title:'logIn',
        error:"",
        data:{}
    })
    
} 

                //2. User Login:
export const logIn=async(req,res,next)=>{
    const {email,password}=req.body
    const userExist=await User.findOne({email})

    if(!userExist){
        return res.render('logIn',{
            css:'../shared/Css/signUp.css',
            js:'../shared/Js/signUp.js',
            title:'logIn',
            error:"Please signUp First😤",
            data:req.body
        })
    }
    if(!userExist.confirmEmail){
        return res.render('logIn',{
            css:'../shared/Css/signUp.css',
            js:'../shared/Js/signUp.js',
            title:'logIn',
            error:"Please Confirm Your Email😤",
            data:req.body
        })
    }
    const isMatch=bcryptjs.compareSync(password,userExist.password)
    if(!isMatch){
        return res.render('logIn',{
                    css:'../shared/Css/signUp.css',
                    js:'../shared/Js/signUp.js',
                    title:'logIn',
                    error:"Invaild Email Or Password😤",
                    data:req.body
                })
    }
    // const token=jwt.sign({email,_id:userExist._id},process.env.TOKEN_KEY)
    req.session.user= {
        id: userExist._id.toString(),
        email: userExist.email,
        role:userExist.role,


    };
    //res.send('User session set');
    userExist.status='Online'
    await userExist.save()
    return res.redirect('/user/displayProfile')

}
//-------------------------------------------------------------------

                       //ConfirmEmail
export const confirmEmail=async(req,res,next)=>{
            const {email,OTP}=req.body
            if(!OTP) return res.status(400).json({message:"You must Enter The Code 😤"})
        
            const confirm= await User.findOneAndUpdate({email,OTP},{confirmEmail:true,OTP:null})  
            if(!confirm) return res.status(400).json({message:"Invaild Email Or code"})
                res.status(200).json({message:"Email Confirmed👏🏻"})
        
        }
//-------------------------------------------------------------------------------------------------------------------------

