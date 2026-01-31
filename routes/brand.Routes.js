import express from "express"
import { brand } from "../models/Models.js"
const router = express.Router()
const allBrand = async (req, res) => {
    const brands = await brand.find({})
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
router.get("/", allBrand)
router.get("/:brandId", singleBrand)
export default router