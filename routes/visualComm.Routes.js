import express from "express"
const router = express.Router()
import { visualComm } from "../models/Models.js"
const visualCommunication = async (req, res) => {
    const visuals = await visualComm.find({})
    console.log("visual: ", visuals)
    res.status(202).json({ visuals, message: "Got Visuals" })
}
router.get("/", visualCommunication)
export default router