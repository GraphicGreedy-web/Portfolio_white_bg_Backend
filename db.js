import mongoose from "mongoose"
import { brand, video, visualComm } from "./models/Models.js"
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
const visuals = [
    {
        order: 1,
        title: "Music Festival 2024",
        category: "Event",
        image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        order: 2,
        title: "Art Exhibition",
        category: "Culture",
        image: "https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        order: 3,
        title: "Tech Summit",
        category: "Conference",
        image: "https://images.pexels.com/photos/7841440/pexels-photo-7841440.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        order: 4,
        title: "Fashion Week",
        category: "Fashion",
        image: "https://images.pexels.com/photos/7991309/pexels-photo-7991309.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        order: 5,
        title: "Design Conference",
        category: "Design",
        image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        order: 6,
        title: "Food Festival",
        category: "Culinary",
        image: "https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        order: 7,
        title: "Photography Exhibition",
        category: "Art",
        image: "https://images.pexels.com/photos/7841440/pexels-photo-7841440.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        order: 8,
        title: "Innovation Summit",
        category: "Business",
        image: "https://images.pexels.com/photos/7991309/pexels-photo-7991309.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
];
const videos = [
    {
        order: 1,
        title: "Brand Story: Luxe Fashion",
        category: "Brand Film",
        thumbnail: "https://images.pexels.com/photos/7991309/pexels-photo-7991309.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "2:30",
        link: "https://youtu.be/UzvswBBTIZ8",
    },
    {
        order: 2,
        title: "Product Launch Campaign",
        category: "Commercial",
        thumbnail: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "1:45",
        link: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        order: 3,
        title: "Motion Graphics Reel",
        category: "Motion Design",
        thumbnail: "https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "3:15",
        link: "https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        order: 4,
        title: "Event Highlight Video",
        category: "Documentary",
        thumbnail: "https://images.pexels.com/photos/7841440/pexels-photo-7841440.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "4:20",
        link: "https://images.pexels.com/photos/7841440/pexels-photo-7841440.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        order: 5,
        title: "Social Media Campaign",
        category: "Digital Content",
        thumbnail: "https://images.pexels.com/photos/7991309/pexels-photo-7991309.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "0:45",
        link: "https://images.pexels.com/photos/7991309/pexels-photo-7991309.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        order: 6,
        title: "Corporate Identity Video",
        category: "Corporate",
        thumbnail: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "2:00",
        link: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
];
export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)

    for (const logo of logos) {
        await brand.updateOne(
            { image: logo.image },
            {
                $set: {
                    order: logo.order,
                    title: logo.title,
                    image: logo.image,
                },
            },
            { upsert: true }
        )
    }

    for (const visual of visuals) {
        await visualComm.updateOne(
            { image: visual.image },
            {
                $set: {
                    order: visual.order,
                    title: visual.title,
                    category: visual.category,
                    image: visual.image,
                },
            },
            { upsert: true }
        )
    }

    for (const item of videos) {
        await video.updateOne(
            { title: item.title },
            {
                $set: {
                    order: item.order,
                    title: item.title,
                    category: item.category,
                    thumbnail: item.thumbnail,
                    duration: item.duration,
                    link: item.link,
                },
            },
            { upsert: true }
        )
    }
}
