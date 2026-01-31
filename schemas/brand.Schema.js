import mongoose from "mongoose";
import { type } from "os";

export const brandSchema = new mongoose.Schema([{
    order: Number,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: String,
}])