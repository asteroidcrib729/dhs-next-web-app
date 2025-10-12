import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        body.newsletter = Boolean(body.newsletter);
        body.terms = Boolean(body.terms);
        
        const {
            firstName,
            lastName,
            email,
            phone,
            company,
            industry,
            service,
            budget,
            message,
            newsletter,
            terms,
        } = body;

        await prisma.contact.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                company,
                industry,
                service,
                budget,
                message,
                newsletter,
                terms,
            },
        });

        await resend.emails.send({
            from: "Tech Venture Solutions <onboarding@resend.dev>",
            to: "info@techventuresolution.com",
            subject: "New Contact Form Submission",
            html:
                `<h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
            `,
        });

        // Send email via Nodemailer
        // const transporter = nodemailer.createTransport({
        //     service: "gmail", // or use SMTP host
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS,
        //     },
        // });
        // 
        // await transporter.sendMail({
        //     from: `"Tech Venture Solutions" <${process.env.EMAIL_USER}>`,
        //     to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
        //     subject: "New Contact Form Submission",
        //     html: `
        // <h2>New Inquiry Received</h2>
        // <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        // <p><strong>Email:</strong> ${email}</p>
        // <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        // <p><strong>Company:</strong> ${company || "N/A"}</p>
        // <p><strong>Service:</strong> ${service}</p>
        // <p><strong>Message:</strong></p>
        // <p>${message}</p>
        // `,
        // });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
