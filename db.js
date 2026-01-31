import mongoose from "mongoose"
import { brand } from "./models/Models.js"
const logos = [
    {
        order: 1,
        title: 'Minimal Tech Co.',
        image: 'https://images.pexels.com/photos/7841440/pexels-photo-7841440.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        order: 2,
        title: 'Artisan Coffee',
        image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        order: 3,
        title: 'Urban Studio',
        image: 'https://images.pexels.com/photos/7841440/pexels-photo-7841440.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        order: 4,
        title: 'Eco Brand',
        image: 'https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
];
export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    // await brand.deleteMany({})
    // console.log("brand dleeted")
    // const logo = await brand.insertMany(logos)
    // console.log("logos inserted: ", logo)
}