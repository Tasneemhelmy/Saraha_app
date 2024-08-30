import jwt from 'jsonwebtoken' 
import User from '../../database/models/user.model.js'



export const authentication=(role)=>{
    return  async(req,res,next)=>{
        if(!req.session?.user){
            return res.render('logIn',{
                css:'../shared/Css/signUp.css',
                js:'../shared/Js/signUp.js',
                title:'logIn',
                vaildationErorr:[],
                error:"invalid session",
            })
        }
            const user = await User.findById(req.session?.user.id)
            if(!user){
                return res.render('signUp',{
                    css:'../shared/Css/signUp.css',
                    js:'../shared/Js/signUp.js',
                    title:'signUp',
                    error:"invaild account",
                    vaildationErorr:[],
                    data:{}
            })
        }
        if(!role.includes(req.session.user.role)){
            return res.render('logIn',{
                css:'../shared/Css/signUp.css',
                js:'../shared/Js/signUp.js',
                title:'logIn',
                vaildationErorr:[],
                error:"Not Authorized to acsess",
            })
        }
        
        next()
        }

}


// export const authentication=asyncHandler(async(req,res,next)=>{
//     const auth=req.headers.authorization
//     if(!auth)
//         return next(new AppError("Unauthorized",401))
//     const token=auth.split('Bearer ')[1]

//     const decodedToken=jwt.verify(token,process.env.KEY)
//     const user=await User.findById(decodedToken._id)
//     if(!user)
//         return next(new AppError("Unauthorized2",401))
//     // if(user.resetToken){
//     //     const trim=parseInt(user.resetToken.getTime()/1000)
//     //     if(trim>decodedToken.iat)
//     //         return next(new AppError("expire token",401))
//     // }
//     req.user=decodedToken
//     next()
// })

// export const authorization=(roles)=>{
//     return asyncHandler(async(req,res,next)=>{
//         if(!roles.includes(req.user.role))
//             return next(new AppError("Unauthorized",401))

//         next()
//     })
// }
