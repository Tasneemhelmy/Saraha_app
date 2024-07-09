import express from 'express'
import env from'dotenv'
import bootstrap from './src/bootstrap.js';
import { connected } from 'process';


const port=5000
const app=express();
env.config()
app.get('/',(req,res,next)=>{
    res.send('Hello World')
})
bootstrap(app,express)
app.listen(port,(error)=>{
    if(error) console.log(error)
        else console.log("server running");
    });