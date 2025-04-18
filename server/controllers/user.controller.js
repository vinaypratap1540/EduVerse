import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/generateToken.js";
import uploadOnCloudinary, { deleteMediaFromCloudinary } from "../utils/cloudinary.js";
export const register = async (req,res) =>{
  try {
    const {name,email,password,address} = req.body;
    if(!name || !email || !password || !address){
      return res.status(400).json({
          success:false,
          message:"All fields are required"
      })
    }
    const user = await User.findOne({email});
    if(user){
      return res.status(409).json({
          success:false,
          message:"User already exist with this email !!!"
      })
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address
    });
    if(!newUser){
      return res.status(400).json({
        success:false,
        message:"User creating error"
      })
    }
    return res.status(200).json({
      success:true,
      message:"Account has created successfully!!!"
    })
  } catch (error) {
    console.log("Error");
    return res.status(500).json({
        success:false,
        message:"Failed to register"
    })
  }
}

export const login = async (req,res) =>{
    try{
     const {email,password} = req.body;
     if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
     }
     const user = await User.findOne({email})
     if(!user){
        return res.status(400).json({
            status:false,
            message:"User does not exist"
        })
     }
     const isPasswordValid = await bcrypt.compare(password,user.password)
     if(!isPasswordValid){
        return res.status(400).json({
            status:false,
            message:"Password is not correct"
        })
     }
    await generateTokens(res,user,`Welcome back ${user.name}`)
    }catch (error) {
        console.log("Error");
        return res.status(500).json({
            success:false,
            message:"Failed to Login"
        })
      }
}

export const logout = async (_,res) =>{
  try {
    return res.status(200).cookie("token","",{maxAge:0}).json({
      success:true,
      message:"Logged out Successfully"
    })
  } catch (error) {
    console.log("Error");
      return res.status(500).json({
            success:false,
            message:"Failed to Logout"
      })
  }
}

export const getUserProfile = async (req,res) =>{
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({
        message:"Profile not found"
      })
    }
    return res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Failed to load user"
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file; // This might be undefined if no file is uploaded

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let photoUrl = user.photoUrl; // Keep existing photo if no new upload

    if (profilePhoto) {
      // Delete old profile pic if exists
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0]; // Extract Cloudinary ID
        await deleteMediaFromCloudinary(publicId);
      }

      // Upload new photo to Cloudinary
      const cloudResponse = await uploadOnCloudinary(profilePhoto.path);
      if (!cloudResponse) {
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
        });
      }
      photoUrl = cloudResponse.secure_url;
    }

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, photoUrl },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
