import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser";
import express from "express"
import brandRoutes from "./routes/brand.Routes.js"
import commentsRoutes from "./routes/comment.Routes.js"
import contactRoutes from "./routes/contact.Routes.js"
import videoRoutes from "./routes/video.Routes.js"
import visualCommRoutes from "./routes/visualComm.Routes.js"
import { connectDB } from "./db.js"
const app = express()
// const allowedOrigin = process.env.FRONTEND_URL
const allowedOrigin = process.env.FRONTEND_URL.split(",").map(o => o.trim())
console.log("back: ", allowedOrigin)
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))
app.set("trust proxy", 1);
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDB()
app.use("/api/brands", brandRoutes)
app.use("/api/comments", commentsRoutes)
app.use("/api/contacts", contactRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/visualComms", visualCommRoutes)
app.use((err, req, res, next) => {
    console.error(err.stack)
    const { status = 500, message = "Something went wrong" } = err
    res.status(status).json({ message })
})
export default app
