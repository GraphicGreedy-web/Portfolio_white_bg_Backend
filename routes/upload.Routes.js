import express from "express"
import cloudinary from "../config/cloudinary.js"
import upload, { requireCloudinaryConfig } from "../middleware/cloudinaryUpload.js"

const router = express.Router()

async function uploadFileToCloudinary(file, folder = "uploads") {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: `shree-portfolio/${folder}`,
                resource_type: "auto",
            },
            (error, uploaded) => {
                if (error) reject(error)
                else resolve(uploaded)
            }
        )

        stream.end(file.buffer)
    })
}

router.post(
    "/cloudinary",
    requireCloudinaryConfig,
    upload.single("file"),
    async (req, res, next) => {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        try {
            const uploaded = await uploadFileToCloudinary(
                req.file,
                req.body.folder || "uploads"
            )

            res.status(201).json({
                message: "File uploaded",
                file: {
                    url: uploaded.secure_url,
                    publicId: uploaded.public_id,
                    resourceType: uploaded.resource_type,
                    originalName: req.file.originalname,
                    mimeType: req.file.mimetype,
                    size: req.file.size,
                },
            })
        } catch (error) {
            next(error)
        }
    }
)

export default router
