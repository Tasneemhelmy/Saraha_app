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
    }


})
userSchema.post('find', function(docs) {
    if (Array.isArray(docs)) {
        docs.forEach(doc => {
            if (doc.image) {
                doc.image = 'http://localhost:5000/uploads/' + doc.image;
            }

            
        });
    } else {
        if (docs.image) {
            docs.image = 'http://localhost:5000/uploads/' + docs.image;
        }

        
    }
});

const User=mongoose.model('User',userSchema)
export default User