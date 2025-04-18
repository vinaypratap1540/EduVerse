import mongoose, {Schema} from "mongoose";

const courseSchema = new Schema({
   title:{
    type:String,
    required:true
   },
   subTitle:{
    type:String
   },
   description:{
    type:String
   },
   category:{
    type:String,
    required:true
   },
   coursePrice:{
    type:Number,
   },
   courseThumbnail:{
    type:String,
   },
   enrolledStudent:[
    {
      type:Schema.Types.ObjectId,
      ref:"User"
    }
   ],
   lectures:[
    {
        type:Schema.Types.ObjectId,
        ref:"Lecture"
    }
   ],
   creator:{
    type:Schema.Types.ObjectId,
    ref:"User"
   },
   isPublished:{
    type:Boolean,
    default:false
   }
   
},{timestamps:true})

export const Course = mongoose.model("Course",courseSchema)