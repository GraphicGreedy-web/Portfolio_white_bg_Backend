import express from "express"
const router = express.Router()
const comment = (req, res) => {
    console.log("contact: ", req.body)
    res.json({ message: "Hello from contact controller" })
}
router.get("/", comment)
export default router