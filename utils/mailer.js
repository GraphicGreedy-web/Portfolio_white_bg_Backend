import nodemailer from "nodemailer"

const getMailerConfig = () => ({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
        : undefined,
})

export const isMailerConfigured = () =>
    Boolean(
        process.env.SMTP_HOST &&
        process.env.SMTP_PORT &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS &&
        process.env.CONTACT_RECEIVER_EMAIL &&
        process.env.MAIL_FROM
    )

export const sendContactEmails = async ({ name, email, projectType, message }) => {
    if (!isMailerConfigured()) {
        throw new Error("Mailer is not configured")
    }

    const transporter = nodemailer.createTransport(getMailerConfig())
    const ownerEmail = process.env.CONTACT_RECEIVER_EMAIL
    const from = process.env.MAIL_FROM

    const ownerHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `

    const customerHtml = `
      <h2>Thanks for reaching out</h2>
      <p>Hi ${name},</p>
      <p>We received your message and will get back to you soon.</p>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Your Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `

    await Promise.all([
        transporter.sendMail({
            from,
            to: ownerEmail,
            replyTo: email,
            subject: `New portfolio inquiry from ${name}`,
            html: ownerHtml,
        }),
        transporter.sendMail({
            from,
            to: email,
            replyTo: ownerEmail,
            subject: "We received your message",
            html: customerHtml,
        }),
    ])
}
