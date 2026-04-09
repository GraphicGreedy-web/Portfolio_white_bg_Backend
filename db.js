import mongoose from "mongoose"
import { brand } from "./models/Models.js"
const logos = [
    {
        order: 1,
        title: 'Instagram Post 1',
        image: 'https://www.instagram.com/p/C2u3H1Wx4Gm/?igsh=MXVzaWpqbm83czM3aA==',
    },
    {
        order: 2,
        title: 'Instagram Post 2',
        image: 'https://www.instagram.com/p/C5vaLbmPlh4/?igsh=eG9qNTYyamY4dWti',
    },
    {
        order: 3,
        title: 'Instagram Post 3',
        image: 'https://www.instagram.com/p/DFfhalCMT1S/?igsh=MWowMnc3bDMyYjQzZg==',
    },
    {
        order: 4,
        title: 'Instagram Post 4',
        image: 'https://www.instagram.com/p/DF0EVu0P0FC/?igsh=MXJtdDd4ajQzMzFwaw==',
    },
    {
        order: 5,
        title: 'Instagram Post 5',
        image: 'https://www.instagram.com/p/DIqtVkNPRI_/?igsh=MWU0MmgwbmJ5eWs0ZA==',
    },
    {
        order: 6,
        title: 'Instagram Post 6',
        image: 'https://www.instagram.com/p/DPOCmEqCGMd/?igsh=a2V5YTJqYzVqMHc1',
    },
    {
        order: 7,
        title: 'Instagram Post 7',
        image: 'https://www.instagram.com/p/DPWidxDDpNO/?igsh=MXV2eGFrb21uNDBobQ==',
    },
    {
        order: 8,
        title: 'Instagram Post 8',
        image: 'https://www.instagram.com/p/DPhe2zVgQ0g/?igsh=MTRvMHl6ODhjbzR4Zw==',
    },
    {
        order: 9,
        title: 'Instagram Post 9',
        image: 'https://www.instagram.com/p/DQea_k3D0DI/?igsh=b2xsYXB1YmZwb3Ry',
    },
];
export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    // await brand.deleteMany({})
    // console.log("brand dleeted")
    // const logo = await brand.insertMany(logos)
    // console.log("logos inserted: ", logo)
}
