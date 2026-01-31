import mongoose from "mongoose";

export const videoSchema = new mongoose.Schema([{
    order: Number,
    description: String,
    link: String,
    updatedAt: Number,
    title: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
    }]
}])