import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {verifyToken} from "./middlewares/authJwt.js";
export {verifyToken};
dotenv.config();
// app.listen(3000);
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch((error) => {
    console.error(error);
})
console.log("Listening on port ",3000);
