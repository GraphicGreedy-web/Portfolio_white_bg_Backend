import mongoose from "mongoose";

export const videoSchema = new mongoose.Schema([{
    order: Number,
    category: String,
    description: String,
    link: String,
    thumbnail: String,
    thumbnailPublicId: String,
    duration: String,
    updatedAt: Number,
    title: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
    }]
}])
