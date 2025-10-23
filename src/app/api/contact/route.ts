// app/api/contact/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------- helpers ----------
const toBool = (v: unknown) => {
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v === 1;
    if (typeof v === 'string') {
        const s = v.trim().toLowerCase();
        return s === 'true' || s === '1' || s === 'on' || s === 'yes';
    }
    return false;
};

const strOrUndefined = (v: unknown) =>
    typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined;

function stringifyErr(e: unknown) {
    if (e instanceof Error) return `${e.name}: ${e.message}\n${e.stack ?? ''}`;
    try {
        return JSON.stringify(e);
    } catch {
        return String(e);
    }
}

function isPrismaKnownRequestError(
    e: unknown
): e is Prisma.PrismaClientKnownRequestError {
    return (
        typeof e === 'object' &&
        e !== null &&
        'code' in e &&
        typeof (e as Record<string, unknown>).code === 'string' &&
        'clientVersion' in e
    );
}

// ---------- handler ----------
export async function POST(req: Request) {
    try {
        const raw = await req.json();

        // Build data EXACTLY as your schema expects:
        // service: required string
        const firstName = strOrUndefined(raw.firstName) ?? '';
        const lastName = strOrUndefined(raw.lastName) ?? '';
        const email = strOrUndefined(raw.email) ?? '';
        const service = strOrUndefined(raw.service) ?? ''; // <-- required string
        const message = typeof raw.message === 'string' ? raw.message : '';

        const data = {
            firstName,
            lastName,
            email,
            phone: strOrUndefined(raw.phone),       // String?
            company: strOrUndefined(raw.company),   // String?
            industry: strOrUndefined(raw.industry), // String?
            service,                                // REQUIRED String
            budget: strOrUndefined(raw.budget),     // String?
            message,
            newsletter: toBool(raw.newsletter),     // Boolean (default false in DB)
            terms: toBool(raw.terms),               // Boolean (required)
        } satisfies Prisma.contactCreateInput;

        // Minimal required validation for your model
        if (!data.firstName || !data.lastName || !data.email || !data.service || !data.terms) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields.' },
                { status: 400 }
            );
        }

        const record = await prisma.contact.create({ data });

        // Send email (don’t fail the request if email fails)
        try {
            await resend.emails.send({
                from: 'Tech Venture Solutions <onboarding@resend.dev>',
                to: 'info@techventuresolution.com',
                subject: 'New Contact Form Submission',
                html: `
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${record.firstName} ${record.lastName}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Phone:</strong> ${record.phone ?? 'N/A'}</p>
          <p><strong>Company:</strong> ${record.company ?? 'N/A'}</p>
          <p><strong>Service:</strong> ${record.service}</p>
          <p><strong>Budget:</strong> ${record.budget ?? 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${record.message ?? ''}</p>
        `,
            });
        } catch (mailErr) {
            console.error('Resend error:', stringifyErr(mailErr));
        }

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        const DEBUG_ERRORS = process.env.DEBUG_ERRORS === 'true';

        if (isPrismaKnownRequestError(err)) {
            if (err.code === 'P2002') {
                return NextResponse.json(
                    { success: false, error: 'Duplicate (unique constraint) value.' },
                    { status: 409 }
                );
            }
            if (err.code === 'P2000') {
                return NextResponse.json(
                    { success: false, error: 'A field is too long for its column.' },
                    { status: 400 }
                );
            }

            console.error('Prisma error:', err.code, stringifyErr(err));

            // return NextResponse.json(
            //     { success: false, error: 'Database error.' },
            //     { status: 500 }
            // );

            const payload: Record<string, unknown> = { success: false, error: 'Internal Server Error' };
            if (DEBUG_ERRORS) payload.raw = err.code;
            return NextResponse.json(payload, { status: 500 });
        }

        console.error('Error submitting contact form:', stringifyErr(err));
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
    }
}