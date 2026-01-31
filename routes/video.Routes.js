import express from "express"
import { video } from "../models/Models.js"
const router = express.Router()
const allVideo = async (req, res) => {
    const videos = await video.find({})
    console.log("video: ", videos)
    res.status(202).json({ videos, message: "Got Videos" })
}
router.get("/", allVideo)
export default router