import express from "express"
const router = express.Router()
const contactController = (req, res) => {
    console.log("contact: ", req.body)
    res.json({ message: "Hello from contact controller" })
}
router.get("/", contactController)
export default router