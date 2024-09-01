import env from'dotenv'
import session from 'express-session';
import flash from 'flash';
import monogoDbStore from 'connect-mongodb-session'

import connected from "../database/connection.js";
import userRoute from './modules/Users/user.route.js'
import massageRouter from './modules/Massages/massage.route.js'
import authRouter from './modules/auth/auth.route.js'

const bootstrap=(app,express)=>{
    // process.on('uncaughtException',(err)=>{
    //     console.log(err)
    // })
    var MongoDBStore=monogoDbStore(session)
    var store = new MongoDBStore({
        uri:"mongodb://127.0.0.1:27017/sarahaApp",
        collection: 'mySessions'
    });
    
    app.use(express.urlencoded({extended:true})) 
    app.set('views',"./src/views")
    app.set('view engine','ejs')
    app.use('/shared',express.static('./src/views/shared'))
    app.use('/uploads',express.static('uploads'))
    app.use(session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
        store

    }));
    app.use(flash())

    app.use('/user',userRoute)
    app.use('/message',massageRouter)
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