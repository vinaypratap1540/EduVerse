import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
      const connetInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
      console.log(`\n MongoDB is connected !! DB host ${connetInstance.connection.host}`)
    } catch (error) {
       console.log("MongoDD connection error",error)
       process.exit(1);
    }
}
export default connectDB