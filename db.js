import mongoose from "mongoose"
import { brand, video, visualComm } from "./models/Models.js"

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)

    await brand.deleteMany({ image: /^https:\/\/www\.instagram\.com\// })
    await brand.deleteMany({ image: /^\/images\/posters\// })

    await visualComm.deleteMany({ image: /^https:\/\/images\.pexels\.com\// })
    await brand.deleteMany({ image: /^\/images\// })
    await visualComm.deleteMany({ image: /^\/images\// })
    await video.deleteMany({ thumbnail: /^https:\/\/images\.pexels\.com\// })
}
