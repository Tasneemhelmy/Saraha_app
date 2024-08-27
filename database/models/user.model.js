import mongoose,{Schema} from "mongoose";
import roles from "../../src/utils/Roles.js";

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
    role:{
        type:String,
        enum:[roles.Admin,roles.User],
        default:roles.User
    },
    image:{
        type:Object,
    },
    status:{
        type:String,
        enum:["Online","Offline"],
        default:"Offline"
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