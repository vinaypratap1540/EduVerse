import express, { Router } from "express"
import upload from "../utils/multer.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

const router = Router()
router.route("/upload-video").post(upload.single("file"), async(req,res)=>{
    try {
      const result = await uploadOnCloudinary(req.file.path)
      res.status(200).json({
        success:true,
        message:"Video uploaded successfully",
        data:result
      })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"There is an error in uploading video",
            success:false
        })
    }
})

export default router