import mongoose,{Schema} from "mongoose";

const massageSchema= new Schema({
    content:{
        type:String,
        required:true
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        required:true
    }
})

const Massage=mongoose.model('Massage',massageSchema)
export default Massage