import Massage from "../../../../database/models/message.model.js";
import User from "../../../../database/models/user.model.js";




                     //1. add message:
export const addMassage=async(req,res,next)=>{
    req.body.receiverId=req.params.id
    const user=await User.findById(req.params.id)
    if(!user){
        res.render('shareProfile',{
            css:'../../shared/Css/signUp.css',
            js:'../../shared/Js/signUp.js',
            title:'Profile',
            user:object,
            status:"In vaild send message ,This user Not Found"
        })  
    } 

    const massage= await Massage.insertMany(req.body)
    res.render('shareProfile',{
        css:'../../shared/Css/signUp.css',
        js:'../../shared/Js/signUp.js',
        title:'Profile',
        user,
        status:"Adedd successfully"
    })  
}
//------------------------------------------------

export const displayMessage=async(req,res,next)=>{
    const user=await User.findById(req.session.user.id)
    const massages=await Massage.find({receiverId:user._id})
            return res.render('message',{
            css:'../shared/Css/signUp.css',
            js:'../shared/Js/signUp.js',
            title:'messages',
            link:`http://localhost:5000/user/displayProfile/${user._id}`,
            user,
            massages
        })  
    }  
//---------------------------------------------------

                   //3. Delete message:
export const deleteMassage=async(req,res,next)=>{
    await Massage.findOneAndDelete({_id:req.params.id,receiverId:req.session.user.id})
    const user=await User.findById(req.session.user.id)
    const massages=await Massage.find({receiverId:user._id})
    return res.render('message',{
    css:'../../shared/Css/signUp.css',
    js:'../../shared/Js/signUp.js',
    title:'messages',
    link:`http://localhost:5000/user/displayProfile/${req.session.user.id}`,
    user,
    massages
})
}  

//-----------------------------------------------------------------------------------------------------------------------------