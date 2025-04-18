import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import uploadOnCloudinary, { deleteMediaFromCloudinary, deleteVideoFromCloudinary } from "../utils/cloudinary.js";

export const createCourse=async(req,res)=>{
    try {
        const {title,category} = req.body;
        if(!title || !category){
            return res.status(400).json({
                message:"Course tile and category are mendatory fields"
            })
        }
        const course = await Course.create({
            title,
            category,
            creator:req.id
        })
         return res.status(200).json({
            course,
            message:"Course Created"
         })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Failed to create course"
        })
    }
}
export const searchCourse=async(req,res)=>{
    try {
        const {query = "", categories = [], sortByPrice =""} = req.query;
        console.log(categories);
        
        // create search query
        const searchCriteria = {
            isPublished:true,
            $or:[
                {title: {$regex:query, $options:"i"}},
                {subTitle: {$regex:query, $options:"i"}},
                {category: {$regex:query, $options:"i"}},
            ]
        }

        // if categories selected
        if(categories.length > 0) {
            searchCriteria.category = {$in: categories};
        }

        // define sorting order
        const sortOptions = {};
        if(sortByPrice === "low"){
            sortOptions.coursePrice = 1;//sort by price in ascending
        }else if(sortByPrice === "high"){
            sortOptions.coursePrice = -1; // descending
        }

        let courses = await Course.find(searchCriteria).populate({path:"creator", select:"name photoUrl"}).sort(sortOptions);

        return res.status(200).json({
            success:true,
            courses: courses || []
        }); 
    } catch (error) {
     console.log(error)
    }
}
export const getCreateCourse = async (req,res)=>{
   try {
    const userId = req.id;
    const courses = await Course.find({creator:userId});
    if(!courses){
        return res.status(401).json({
            courses:[],
            message:"Courses not found"
        })
    }
    return res.status(200).json({
        courses
    })
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        message:"Failed to get course"
    })
   }
}

export const getPublishedCourse = async(_,res)=>{
    try {
        const courses = await Course.find({isPublished:true}).populate({path:"creator",select:"name photoUrl"})
        if(!courses){
            return res.status(404).json({
                message:"Course not found"
            })
        }
        return res.status(200).json({
           courses,
           success:true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Failed to get Published course"
        })  
    }
}
export const editCourse = async(req,res) =>{
  try {
    const courseId = req.params.courseId;
    const {title,subTitle,description,category,coursePrice} = req.body;
    const courseThumbnail = req.file;
    let course = await Course.findById(courseId);
    if(!course){
      return res.status(404).json({
          message:"Course not found"
      })
    }
    let thumbnail;
    if(courseThumbnail){
      if(course.courseThumbnail){
          const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
          await deleteMediaFromCloudinary(publicId)
      }
      thumbnail=await uploadOnCloudinary(courseThumbnail.path);
    }
    const updateData = {title,subTitle,description,category,coursePrice,courseThumbnail:thumbnail?.secure_url}
    course = await Course.findByIdAndUpdate(courseId,updateData,{new:true});
    return res.status(201).json({
      course,
      message:"Course updated successfully"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        message:"Failed to get course"
    })
  }
}

export const getCourseById = async(req,res)=>{
   try {
     const courseId = req.params.courseId;
     const course = await Course.findById(courseId)
     if(!course){
        return res.status(404).json({
            message:"Course not found"
        })
     }
     return res.status(201).json({
        course,
        message:"course successfully fetched by id"
     })
   } catch (error) {
       console.log(error)
       return res.status(500).json({
       message:"Failed to get course Id"
    })
   }
}

export const createLecture=async(req,res)=>{
    try {
       const {lectureTitle} = req.body;
       const {courseId} = req.params;
       if(!lectureTitle || !courseId){
        return res.status(400).json({
            success:false,
            message:"Lecture title is required"
        })
       }
       const lecture = await Lecture.create({lectureTitle})
       const course = await Course.findById(courseId)
       if(course){
        course.lectures.push(lecture._id)
        await course.save()
       }
       return res.status(201).json({
        lecture,
        message:"Lecture is created successfully"
       })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        message:"Failed to create course"
     }) 
    }
}

export const getCourseLecture=async(req,res)=>{
    try {
       const {courseId} = req.params;
       const course = await Course.findById(courseId).populate("lectures").exec() // to access lecture data
       if(!course){
        return res.status(404).json({
            message:"Course not found"
        })
       }
       return res.status(201).json({
         lectures:course.lectures
       })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
        message:"Failed to get course"
     })   
    }
}

export const editLecture = async(req,res)=>{
    try {
       const {lectureTitle,videoInfo,isPreviewFree} = req.body;
       const {courseId,lectureId} = req.params;
       const lecture = await Lecture.findById(lectureId)
       if(!lecture){
        return res.status(404).json({
            message:"Lecture not found"
        })
       }
       if(lectureTitle){
        lecture.lectureTitle=lectureTitle
       }
       if(videoInfo?.videoUrl){
        lecture.videoUrl = videoInfo.videoUrl
       }
       if(videoInfo?.publicId){
        lecture.publicId = videoInfo.publicId
       }
       lecture.isPreviewFree = isPreviewFree

       await lecture.save()
       //Ensure the course still has lecture id if it was not already added

       const course = await Course.findById(courseId)
       if(course && !course.lectures.includes(lecture._id)){
        course.lectures.push(lecture._id);
        await course.save()
       }
       return res.status(200).json({
        lecture,
        message:"Lecture updated successfully"
       })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        message:"Failed to get course"
     })
    }
}

export const removeLecture = async(req,res)=>{
    try {
        const {lectureId} = req.params;

        // Check if the lecture exists
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if(!lecture){
            return res.status(404).json({
                message:"Lecture not found"
            })
        }

        // Delete video from Cloudinary
        if(lecture.publicId){
            await deleteVideoFromCloudinary(lecture.publicId)
        }

        // Remove the lecture reference from the associated course
        await Course.updateOne(
            {lectures:lectureId}, // find the course that contains the lecture
            {$pull:{lectures:lectureId}} // Remove the lectures id from the lectures array
        );

        return res.status(200).json({
            message:"Lecture removed successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        message:"Failed to remove lecture"
     }) 
    }
}

export const getLectureById = async(req,res)=>{
    try {
       const {lectureId} = req.params;
       const lecture = await Lecture.findById(lectureId)
       if(!lecture){
        return res.status(404).json({
            message:"Lecture not found!"
        });
    }
    return res.status(200).json({
        lecture
    });  
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        message:"Failed to find lecture"
     }) 
    }
}

export const togglePublishCourse = async(req,res)=>{
    try {
       const {courseId} = req.params;
       const {publish} = req.query; // return value true or false
       const course = await Course.findById(courseId)
       if(!course){
        return res.status(400).json({
            success:false,
            message:"Course not found for publish"
        })
       }
       course.isPublished = publish==="true"
       await course.save()
       const stateMessage = course.isPublished ? "Published" : "Unpublished"

       return res.status(200).json({
        message:`Course is ${stateMessage}`
       })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        message:"Failed to publish Course"
     }) 
    }
}