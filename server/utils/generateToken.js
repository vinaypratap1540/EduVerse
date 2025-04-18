import jwt from "jsonwebtoken"

export const generateTokens = async(res,user,message) =>{
    const token = jwt.sign(
        {
         userId:user._id
        },
        process.env.SECRET_KEY,
        {
            expiresIn:'1d'
        }
  )
  const options = {
    httpOnly:true,
    secure:true
  }
  return res
  .status(200)
  .cookie("token",token,options)
  .json({
    success:true,
    message,
    user
  })
}