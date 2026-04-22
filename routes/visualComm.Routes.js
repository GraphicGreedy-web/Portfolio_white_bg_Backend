import express from "express"
const router = express.Router()
import { visualComm } from "../models/Models.js"
import { requireCmsAuth } from "../middleware/adminAuth.js"
const visualCommunication = async (req, res) => {
    const visuals = await visualComm.find({}).sort({ order: 1, updatedAt: 1 })
    console.log("visual: ", visuals)
    res.status(202).json({ visuals, message: "Got Visuals" })
}
const singleVisualCommunication = async (req, res) => {
    const { visualId } = req.params
    const singleVisual = await visualComm.findById(visualId)
    res.json({ singleVisual, message: "Got Visual" })
}
const createVisualCommunication = async (req, res) => {
    const nextOrder = (await visualComm.countDocuments()) + 1
    const createdVisual = await visualComm.create({
        title: req.body.title,
        image: req.body.image,
        imagePublicId: req.body.imagePublicId,
        category: req.body.category || "Poster",
        order: req.body.order || nextOrder,
        updatedAt: Date.now(),
    })
    res.status(201).json({ visual: createdVisual, message: "Visual created" })
}
const updateVisualCommunication = async (req, res) => {
    const updatedVisual = await visualComm.findByIdAndUpdate(
        req.params.visualId,
        {
            title: req.body.title,
            image: req.body.image,
            imagePublicId: req.body.imagePublicId,
            category: req.body.category || "Poster",
            updatedAt: Date.now(),
        },
        { new: true }
    )
    res.json({ visual: updatedVisual, message: "Visual updated" })
}
const deleteVisualCommunication = async (req, res) => {
    await visualComm.findByIdAndDelete(req.params.visualId)
    res.json({ message: "Visual deleted" })
}
router.get("/", visualCommunication)
router.post("/", requireCmsAuth, createVisualCommunication)
router.get("/:visualId", singleVisualCommunication)
router.patch("/:visualId", requireCmsAuth, updateVisualCommunication)
router.delete("/:visualId", requireCmsAuth, deleteVisualCommunication)
export default router
