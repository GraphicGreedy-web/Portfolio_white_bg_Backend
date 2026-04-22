import express from "express"
import { brand } from "../models/Models.js"
import { requireCmsAuth } from "../middleware/adminAuth.js"
const router = express.Router()
const allBrand = async (req, res) => {
    const brands = await brand.find({}).sort({ order: 1, createdAt: 1 })
    // console.log("brands: ", brands)
    res.json({ brands, message: "Hello from contact controller" })
}
const singleBrand = async (req, res) => {
    const { brandId } = req.params;
    console.log("got brand Id: ", brandId);
    const singleBrand = await brand.findById(brandId)
    console.log("single brand: ", singleBrand)
    res.json({ singleBrand, message: "Hello from contact controller" })
}
const createBrand = async (req, res) => {
    const nextOrder = (await brand.countDocuments()) + 1
    const createdBrand = await brand.create({
        title: req.body.title,
        image: req.body.image,
        imagePublicId: req.body.imagePublicId,
        order: req.body.order || nextOrder,
    })
    res.status(201).json({ brand: createdBrand, message: "Brand created" })
}
const updateBrand = async (req, res) => {
    const updatedBrand = await brand.findByIdAndUpdate(
        req.params.brandId,
        {
            title: req.body.title,
            image: req.body.image,
            imagePublicId: req.body.imagePublicId,
        },
        { new: true }
    )
    res.json({ brand: updatedBrand, message: "Brand updated" })
}
const deleteBrand = async (req, res) => {
    await brand.findByIdAndDelete(req.params.brandId)
    res.json({ message: "Brand deleted" })
}
router.get("/", allBrand)
router.post("/", requireCmsAuth, createBrand)
router.get("/:brandId", singleBrand)
router.patch("/:brandId", requireCmsAuth, updateBrand)
router.delete("/:brandId", requireCmsAuth, deleteBrand)
export default router
