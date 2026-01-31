import express from "express"
import { brand } from "../models/Models.js"
const router = express.Router()
const allBrand = async (req, res) => {
    const brands = await brand.find({})
    console.log("brands: ", brands)
    res.json({ brands, message: "Hello from contact controller" })
}
router.get("/", allBrand)
export default router