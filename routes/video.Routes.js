import express from "express"
import { video } from "../models/Models.js"
import { requireCmsAuth } from "../middleware/adminAuth.js"
const router = express.Router()
const allVideo = async (req, res) => {
    const videos = await video.find({}).sort({ order: 1, updatedAt: 1 })
    console.log("video: ", videos)
    res.status(202).json({ videos, message: "Got Videos" })
}
const createVideo = async (req, res) => {
    const nextOrder = (await video.countDocuments()) + 1
    const createdVideo = await video.create({
        title: req.body.title,
        thumbnail: req.body.thumbnail || req.body.image,
        thumbnailPublicId: req.body.thumbnailPublicId || req.body.imagePublicId,
        category: req.body.category || "Video",
        duration: req.body.duration || "",
        link: req.body.link || "",
        order: req.body.order || nextOrder,
        updatedAt: Date.now(),
    })
    res.status(201).json({ video: createdVideo, message: "Video created" })
}
const updateVideo = async (req, res) => {
    const updatedVideo = await video.findByIdAndUpdate(
        req.params.videoId,
        {
            title: req.body.title,
            thumbnail: req.body.thumbnail || req.body.image,
            thumbnailPublicId: req.body.thumbnailPublicId || req.body.imagePublicId,
            category: req.body.category || "Video",
            duration: req.body.duration || "",
            link: req.body.link || "",
            updatedAt: Date.now(),
        },
        { new: true }
    )
    res.json({ video: updatedVideo, message: "Video updated" })
}
const deleteVideo = async (req, res) => {
    await video.findByIdAndDelete(req.params.videoId)
    res.json({ message: "Video deleted" })
}
router.post("/", requireCmsAuth, createVideo)
router.get("/", allVideo)
router.patch("/:videoId", requireCmsAuth, updateVideo)
router.delete("/:videoId", requireCmsAuth, deleteVideo)
export default router
