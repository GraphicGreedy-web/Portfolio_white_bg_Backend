import path from "node:path"
import { fileURLToPath } from "node:url"
import mongoose from "mongoose"
import cloudinary from "../config/cloudinary.js"
import { brand, visualComm } from "../models/Models.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..", "..")
const publicDir = path.join(rootDir, "client", "public")

const isLocalPublicPath = (value = "") => value.startsWith("/images/")

const uploadPublicImage = async (publicPath, folder) => {
    const localPath = path.join(publicDir, publicPath)
    const publicId = path
        .basename(publicPath, path.extname(publicPath))
        .replace(/[^a-z0-9-_]/gi, "-")
        .toLowerCase()

    const result = await cloudinary.uploader.upload(localPath, {
        folder: `shree-portfolio/${folder}`,
        public_id: publicId,
        resource_type: "auto",
        overwrite: true,
    })

    return {
        url: result.secure_url,
        publicId: result.public_id,
    }
}

const migrateCollection = async ({ model, imageField, publicIdField, folder }) => {
    const items = await model.find({ [imageField]: /^\/images\// })

    for (const item of items) {
        const currentImage = item[imageField]
        if (!isLocalPublicPath(currentImage)) continue

        const uploaded = await uploadPublicImage(currentImage, folder)
        item[imageField] = uploaded.url
        item[publicIdField] = uploaded.publicId
        await item.save()
        console.log(`Uploaded ${item.title}: ${uploaded.url}`)
    }

    return items.length
}

await mongoose.connect(process.env.MONGO_URI)

const brandCount = await migrateCollection({
    model: brand,
    imageField: "image",
    publicIdField: "imagePublicId",
    folder: "logos",
})

const visualCount = await migrateCollection({
    model: visualComm,
    imageField: "image",
    publicIdField: "imagePublicId",
    folder: "visuals",
})

await mongoose.disconnect()

console.log(`Done. Migrated ${brandCount} logo records and ${visualCount} visual records.`)
