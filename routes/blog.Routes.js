import express from "express"
import { blog } from "../models/Models.js"
import { requireCmsAuth } from "../middleware/adminAuth.js"

const router = express.Router()

const allBlogs = async (req, res) => {
    const blogs = await blog.find({}).sort({ order: 1, updatedAt: -1, createdAt: -1 })
    res.json({ blogs, message: "Got blogs" })
}

const createBlog = async (req, res) => {
    const nextOrder = (await blog.countDocuments()) + 1
    const createdBlog = await blog.create({
        title: req.body.title,
        excerpt: req.body.excerpt || "",
        content: req.body.content || "",
        image: req.body.image || "",
        imagePublicId: req.body.imagePublicId || "",
        order: req.body.order || nextOrder,
        updatedAt: Date.now(),
    })

    res.status(201).json({ blog: createdBlog, message: "Blog created" })
}

const updateBlog = async (req, res) => {
    const updatedBlog = await blog.findByIdAndUpdate(
        req.params.blogId,
        {
            title: req.body.title,
            excerpt: req.body.excerpt || "",
            content: req.body.content || "",
            image: req.body.image || "",
            imagePublicId: req.body.imagePublicId || "",
            updatedAt: Date.now(),
        },
        { new: true }
    )

    res.json({ blog: updatedBlog, message: "Blog updated" })
}

const deleteBlog = async (req, res) => {
    await blog.findByIdAndDelete(req.params.blogId)
    res.json({ message: "Blog deleted" })
}

router.get("/", allBlogs)
router.post("/", requireCmsAuth, createBlog)
router.patch("/:blogId", requireCmsAuth, updateBlog)
router.delete("/:blogId", requireCmsAuth, deleteBlog)

export default router
