import express from "express"
import { getPublicCmsToken } from "../middleware/adminAuth.js"

const router = express.Router()

router.post("/login", (req, res) => {
    const username = process.env.CMS_USERNAME || "admin"
    const password = process.env.CMS_PASSWORD || "admin"

    if (req.body?.username === username && req.body?.password === password) {
        return res.json({ token: getPublicCmsToken(), message: "Logged in" })
    }

    res.status(401).json({ message: "Invalid username or password" })
})

export default router
