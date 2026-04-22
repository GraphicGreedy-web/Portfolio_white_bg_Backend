import mongoose from "mongoose"
import { brand, video, visualComm } from "./models/Models.js"
const logos = [
    {
        order: 1,
        title: 'Brand Design 1',
        image: '/images/logos/brand-design-1.svg',
    },
    {
        order: 2,
        title: 'Brand Design 2',
        image: '/images/logos/brand-design-2.svg',
    },
    {
        order: 3,
        title: 'Brand Design 3',
        image: '/images/logos/brand-design-3.svg',
    },
    {
        order: 4,
        title: 'Brand Design 4',
        image: '/images/logos/brand-design-4.svg',
    },
    {
        order: 5,
        title: 'Brand Design 5',
        image: '/images/logos/brand-design-5.svg',
    },
    {
        order: 6,
        title: 'Brand Design 6',
        image: '/images/logos/brand-design-6.svg',
    },
    {
        order: 7,
        title: 'Brand Design 7',
        image: '/images/logos/brand-design-7.svg',
    },
    {
        order: 8,
        title: 'Brand Design 8',
        image: '/images/logos/brand-design-8.svg',
    },
    {
        order: 9,
        title: 'Brand Design 9',
        image: '/images/logos/brand-design-9.svg',
    },
];
const visuals = [
    {
        order: 1,
        title: "3 AM",
        category: "Poster",
        image: "/images/posters/3-am.png",
    },
    {
        order: 2,
        title: "Artboard 1 Copy 3",
        category: "Poster",
        image: "/images/posters/artboard-1-copy-3.png",
    },
    {
        order: 3,
        title: "Coffee Day Social Media Post",
        category: "Poster",
        image: "/images/posters/coffee-day-social-media-post.png",
    },
    {
        order: 4,
        title: "Engine Need A Rest",
        category: "Poster",
        image: "/images/posters/engine-need-a-rest.png",
    },
    {
        order: 5,
        title: "Face Color",
        category: "Poster",
        image: "/images/posters/face-color.png",
    },
    {
        order: 6,
        title: "Group 1 Copy 2",
        category: "Poster",
        image: "/images/posters/group-1-copy-2.png",
    },
    {
        order: 7,
        title: "Headset",
        category: "Poster",
        image: "/images/posters/headset.png",
    },
    {
        order: 8,
        title: "Sketch 1",
        category: "Poster",
        image: "/images/posters/img-20240130-222233-769.jpg",
    },
    {
        order: 9,
        title: "Sketch 2",
        category: "Poster",
        image: "/images/posters/img-20240414-171142-494.jpg",
    },
    {
        order: 10,
        title: "Layer 8",
        category: "Poster",
        image: "/images/posters/layer-8.png",
    },
    {
        order: 11,
        title: "Mumbai Blast 2008",
        category: "Poster",
        image: "/images/posters/mumbai-blast-2008.png",
    },
    {
        order: 12,
        title: "One Day",
        category: "Poster",
        image: "/images/posters/one-day.png",
    },
    {
        order: 13,
        title: "Orange Poster",
        category: "Poster",
        image: "/images/posters/orange-poster.png",
    },
    {
        order: 14,
        title: "Red Bull",
        category: "Poster",
        image: "/images/posters/red-bull.png",
    },
    {
        order: 15,
        title: "Sherlock",
        category: "Poster",
        image: "/images/posters/sherlock.png",
    },
    {
        order: 16,
        title: "Standup Comedy",
        category: "Poster",
        image: "/images/posters/standup-comedy.png",
    },
    {
        order: 17,
        title: "The Sun Remembers Everything",
        category: "Poster",
        image: "/images/posters/the-sun-remembers-everything.png",
    },
    {
        order: 18,
        title: "Transparent Body",
        category: "Poster",
        image: "/images/posters/transparent-body.png",
    },
    {
        order: 19,
        title: "Woman In Focus",
        category: "Poster",
        image: "/images/posters/woman-in-focus.png",
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

    await brand.deleteMany({ image: /^https:\/\/www\.instagram\.com\// })
    await brand.deleteMany({ image: /^\/images\/posters\// })

    for (const logo of logos) {
        await brand.updateOne(
            { order: logo.order },
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

    await visualComm.deleteMany({ image: /^https:\/\/images\.pexels\.com\// })

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
