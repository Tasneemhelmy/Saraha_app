import connected from "../database/connection.js";
import globalError from "./middelware/globalError.js";
import userRoute from './modules/Users/user.route.js'
import massageRouter from './modules/Massages/massage.route.js'

const bootstrap=(app,express)=>{
    process.on('uncaughtException',(err)=>{
        console.log(err)
    })
    connected()
    app.use(express.json());
    app.use('/user',userRoute)
    app.use('/massage',massageRouter)
    app.use(globalError)  
    process.on('unhandledRejection',(err)=>{
        console.log(err)
    })
    
}

export default bootstrap