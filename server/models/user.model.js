import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
   name:{
    type:String,
    required:true,
    trim:true,
    index:true
   },
   email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true
   },
   password:{
    type:String,
    required:[true,"Password is required"]
   },
   address:{
    type:String,
    required:true
   },
   role:{
    type:String,
    enum:["instructor","student"],
    default:"instructor"
   },
   enrolledCourse:[
    {
        type:Schema.Types.ObjectId,
        ref:"course"
    }
   ],
   photoUrl:{
    type:String,
    default:""
   }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)
