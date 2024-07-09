import mongoose,{Schema} from "mongoose";

const userSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,
        enum:['female','male'],
        default:'female'
    },
    OTP:{
        type:Number
    }

})

const User=mongoose.model('User',userSchema)
export default User