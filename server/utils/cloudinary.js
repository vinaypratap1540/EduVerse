import { v2 as cloudinary } from "cloudinary";
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
      if(!localFilePath) return null;
      //upload the file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
        
      })
      return response
    } catch (error) {
        console.log(error)
    }
}
export const deleteMediaFromCloudinary = async(publicId)=>{
    try{
        await cloudinary.uploader.destroy(publicId)
    }catch(error){
        console.log(error)
    }
}
export const deleteVideoFromCloudinary = async(publicId)=>{
    try{
        await cloudinary.uploader.destroy(publicId,{resource_type:"video"})
    }catch(error){
        console.log(error)
    }
}

export default uploadOnCloudinary