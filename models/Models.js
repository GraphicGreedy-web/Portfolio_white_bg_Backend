import mongoose from "mongoose";
import { blogSchema } from "../schemas/blog.Schema.js";
import { brandSchema } from "../schemas/brand.Schema.js";
import { commentSchema } from "../schemas/comment.Schema.js";
import { visualCommSchema } from "../schemas/visualComm.Schema.js";
import { videoSchema } from "../schemas/video.Schema.js";
import { contactSchema } from "../schemas/contact.Schema.js";
export const blog = mongoose.model("Blog", blogSchema)
export const brand = mongoose.model("Brand", brandSchema)
export const comment = mongoose.model("Comment", commentSchema)
export const visualComm = mongoose.model("VisualComm", visualCommSchema)
export const video = mongoose.model("Video", videoSchema)
export const contact = mongoose.model("Contact", contactSchema)
