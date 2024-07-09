import Massage from "../../../../database/models/message.model.js";
import asyncHandler from "../../../middelware/asyncHandller.js";
import AppError from "../../../utils/Error.js";



                     //1. add message:
export const addMassage=asyncHandler(async(req,res,next)=>{
    req.body.receiverId=req.user._id
    const massage= await Massage.insertMany(req.body)
    res.status(200).json({massage:"massage Added"})
})
//------------------------------------------------

                    //2. Read messages:
export const getMassages=asyncHandler(async(req,res,next)=>{
    const massages=await Massage.find({receiverId:req.user._id}).select('content')
    if(!massages.length)
        return next(new AppError("No messages",400))
    res.status(200).json({massage:"Done",massages})
})
//---------------------------------------------------

                   //3. Delete message:
export const deleteMassage=asyncHandler(async(req,res,next)=>{
    const massage=await Massage.findOneAndDelete({_id:req.params.id,receiverId:req.user._id})
    if(!massage)
        return next(new AppError("Not Found This Massages ",400))

    res.status(200).json({massage:"Deleted",massage})
})

//-----------------------------------------------------------------------------------------------------------------------------