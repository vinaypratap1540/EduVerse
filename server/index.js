import express from "express";
import connectDB from "./database/dbconnect.js";
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js"
import purchaseRoute from "./routes/coursePurchase.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js"
const app = express();
dotenv.config({
    path:"./.env"
})
app.use(express.json())
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))
app.use(cookieParser())
connectDB()
.then(()=>{app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is listening ${process.env.PORT}`)
  })
})
.catch((error)=>{
    console.log("MongoDB connection Failed",error)
})

app.use("/api/v1/users",userRoute)
app.use("/api/v1/course",courseRoute)
app.use("/api/v1/media",mediaRoute)
app.use("/api/v1/purchase",purchaseRoute)
app.use("/api/v1/progress",courseProgressRoute)