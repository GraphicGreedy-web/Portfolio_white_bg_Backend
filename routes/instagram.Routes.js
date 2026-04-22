import axios from "axios"
import express from "express"

const router = express.Router()
const thumbnailCache = new Map()

const INSTAGRAM_HOSTS = new Set(["instagram.com", "www.instagram.com"])

const isInstagramPostUrl = (value) => {
    try {
        const url = new URL(value)
        return INSTAGRAM_HOSTS.has(url.hostname) && url.pathname.startsWith("/p/")
    } catch {
        return false
    }
}

const decodeHtml = (value) =>
    value
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#39;/g, "'")

router.get("/thumbnail", async (req, res, next) => {
    try {
        const postUrl = req.query.url

        if (typeof postUrl !== "string" || !isInstagramPostUrl(postUrl)) {
            return res.status(400).json({ message: "Invalid Instagram post URL" })
        }

        if (thumbnailCache.has(postUrl)) {
            return res.json({ image: thumbnailCache.get(postUrl) })
        }

        const response = await axios.get(postUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
                Accept: "text/html,application/xhtml+xml",
            },
            timeout: 8000,
        })

        const match = response.data.match(
            /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i
        )

        if (!match?.[1]) {
            return res.status(404).json({ message: "Instagram thumbnail not found" })
        }

        const image = decodeHtml(match[1])
        thumbnailCache.set(postUrl, image)
        res.json({ image })
    } catch (error) {
        next(error)
    }
})

export default router
