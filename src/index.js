import app from "./app.js";
export default app;
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch((error) => {
    console.error(error);
})


