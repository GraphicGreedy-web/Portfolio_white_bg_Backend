import mongoose from "mongoose";

export const blogSchema = new mongoose.Schema(
    {
        title: String,
        excerpt: String,
        content: String,
        image: String,
        imagePublicId: String,
        order: Number,
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
)
