import express from "express"
import { z } from "zod"
import { contact } from "../models/Models.js"
import { isMailerConfigured, sendContactEmails } from "../utils/mailer.js"

const router = express.Router()

const contactSchema = z.object({
    name: z.string().trim().min(2, "Name is required"),
    email: z.email("Valid email is required"),
    projectType: z.string().trim().min(2, "Project type is required"),
    message: z.string().trim().min(10, "Message must be at least 10 characters"),
})

router.get("/", async (req, res) => {
    const contacts = await contact.find({}).sort({ createdAt: -1 })
    res.json({ contacts })
})

router.post("/", async (req, res, next) => {
    try {
        const parsed = contactSchema.parse(req.body)
        const savedContact = await contact.create(parsed)

        let emailSent = false
        if (isMailerConfigured()) {
            await sendContactEmails(parsed)
            emailSent = true
        }

        res.status(201).json({
            success: true,
            message: emailSent
                ? "Message sent successfully."
                : "Message saved successfully. Mailer is not configured yet.",
            contact: savedContact,
            emailSent,
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: error.issues[0]?.message || "Invalid contact form data",
            })
        }
        next(error)
    }
})

export default router
