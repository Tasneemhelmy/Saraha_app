import env from'dotenv'
import session from 'express-session';
import flash from 'flash';

import connected from "../database/connection.js";
import userRoute from './modules/Users/user.route.js'
import massageRouter from './modules/Massages/massage.route.js'
import authRouter from './modules/auth/auth.route.js'

const bootstrap=(app,express)=>{
    // process.on('uncaughtException',(err)=>{
    //     console.log(err)
    // })
    app.use(express.urlencoded({extended:true})) 
    app.set('views',"./src/views")
    app.set('view engine','ejs')
    app.use('/shared',express.static('./src/views/shared'))
    app.use('/uploads',express.static('uploads'))
    app.use(session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: false
    }));
    app.use(flash())

    app.use('/user',userRoute)
    app.use('/massage',massageRouter)
    app.use('/Auth',authRouter)
    app.all('*',(req,res,next)=>{
        res.send("In-vaild Routing")
    })

    env.config()  
    connected()  
    // app.use(globalError)  
    // process.on('unhandledRejection',(err)=>{
    //     console.log(err)
    // })
    
}

export default bootstrap