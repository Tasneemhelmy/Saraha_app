import jwt from'jsonwebtoken'

       //3. Token Verification Middleware:
export const verfiyToken=(req,res,next)=>{
    const authorization= req.headers.authorization
        const token=authorization.split('Bearer ')[1]
        const payload=jwt.verify(token,'secret')
        if(!payload)
            return res.status(404).json({message:"Invaild Payload"})

        req.user=payload

        next()
}

export default verfiyToken