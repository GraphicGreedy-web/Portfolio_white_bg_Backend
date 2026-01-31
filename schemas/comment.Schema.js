import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema([{
    title: String,
    updatedAt: Number,
    description: String,
}])