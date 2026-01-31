import mongoose from "mongoose";

export const visualCommSchema = new mongoose.Schema([{
    order: Number,
    image: String,
    updatedAt: Number,
    title: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
    }]
}])