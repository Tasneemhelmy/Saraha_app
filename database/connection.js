import mongoose from "mongoose";
const connected=()=>{
    
    mongoose.connect('mongodb://127.0.0.1:27017/assi9').then(()=>{
        console.log("connected to database")
    }).catch((err)=>{
        console.log(err)
    })
}
export default connected