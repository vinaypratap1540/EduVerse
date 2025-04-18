import mongoose,{Schema} from "mongoose"

const lectureSchema = new Schema({
    lectureTitle:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String
    },
    publicId:{
        type:String
    },
    isPreviewFree:{
        type:Boolean
    }
},{timestamps:true})

export const Lecture = mongoose.model("Lecture",lectureSchema)