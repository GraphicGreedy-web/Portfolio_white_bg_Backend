import path from "node:path"
import mongoose from "mongoose"
import cloudinary from "../config/cloudinary.js"
import { video } from "../models/Models.js"

const localVideos = [
    {
        title: "1st_out",
        filePath: "C:\\Users\\Asus\\Downloads\\1st_out.mp4",
        category: "Video",
    },
    {
        title: "6_ot",
        filePath: "C:\\Users\\Asus\\Downloads\\6_ot.mp4",
        category: "Video",
    },
    {
        title: "Coffee ad_2",
        filePath: "C:\\Users\\Asus\\Downloads\\Coffee ad_2.mp4",
        category: "Video",
    },
    {
        title: "Color Matte",
        filePath: "C:\\Users\\Asus\\Downloads\\Color Matte.mp4",
        category: "Video",
    },
    {
        title: "orange poster video",
        filePath: "C:\\Users\\Asus\\Downloads\\orange poster video.mp4",
        category: "Video",
    },
    {
        title: "sun set 1",
        filePath: "C:\\Users\\Asus\\Downloads\\sun set 1.mp4",
        category: "Video",
    },
]

const slugify = (value) =>
    String(value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")

const formatDuration = (seconds = 0) => {
    const total = Math.max(0, Math.round(Number(seconds) || 0))
    const mins = Math.floor(total / 60)
    const secs = String(total % 60).padStart(2, "0")
    return `${mins}:${secs}`
}

const uploadLargeVideo = (filePath, publicId) =>
    new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(
            filePath,
            {
                resource_type: "video",
                public_id: publicId,
                overwrite: true,
                chunk_size: 20_000_000,
            },
            (error, result) => {
                if (error) reject(error)
                else resolve(result)
            }
        )
    })

const connectWithRetry = async (attempts = 3) => {
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 120000,
                connectTimeoutMS: 120000,
            })
            return
        } catch (error) {
            if (attempt === attempts) throw error
            console.log(`Mongo connect attempt ${attempt} failed, retrying...`)
        }
    }
}

for (const item of localVideos) {
    if (!path.isAbsolute(item.filePath)) {
        throw new Error(`Video path must be absolute: ${item.filePath}`)
    }
}

await connectWithRetry()

for (let index = 0; index < localVideos.length; index += 1) {
    const item = localVideos[index]
    const publicId = `shree-portfolio/videos/${slugify(item.title)}`
    try {
        const uploaded = await uploadLargeVideo(item.filePath, publicId)

        const thumbnailUrl = cloudinary.url(uploaded.public_id, {
            resource_type: "video",
            format: "jpg",
            secure: true,
            transformation: [
                { width: 1280, height: 720, crop: "fill", gravity: "auto" },
                { quality: "auto" },
            ],
        })

        const existing = await video.findOne({ title: item.title })
        const order = existing?.order || index + 1

        const saved = await video.findOneAndUpdate(
            { title: item.title },
            {
                $set: {
                    title: item.title,
                    category: item.category,
                    link: uploaded.secure_url,
                    videoPublicId: uploaded.public_id,
                    thumbnail: thumbnailUrl,
                    thumbnailPublicId: `${uploaded.public_id}.jpg`,
                    duration: formatDuration(uploaded.duration),
                    updatedAt: Date.now(),
                    order,
                },
            },
            { new: true, upsert: true }
        )

        console.log(`Uploaded ${saved.title}`)
        console.log(`  video: ${saved.link}`)
        console.log(`  thumb: ${saved.thumbnail}`)
    } catch (error) {
        console.error(`Failed ${item.title}`)
        console.error(error)
    }
}

await mongoose.disconnect()
console.log("Done uploading local videos to Cloudinary and Mongo.")
