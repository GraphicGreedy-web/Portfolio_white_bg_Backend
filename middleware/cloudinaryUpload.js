import multer from "multer"
import { isCloudinaryConfigured } from "../config/cloudinary.js"

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 25 * 1024 * 1024,
    },
})

export const requireCloudinaryConfig = (req, res, next) => {
    if (!isCloudinaryConfigured()) {
        return res.status(500).json({
            message:
                "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
        })
    }

    next()
}

export default upload
