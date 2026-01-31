import mongoose from "mongoose";

export const contactSchema = new mongoose.Schema([{
    name: String,
    number:Number,
    email:String,
    projectType:[String],
    message:String,
    updatedAt: Number,
}])