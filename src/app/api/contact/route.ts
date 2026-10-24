// app/api/contact/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import { sendContactNotification } from "@/lib/contact-notification";
import { isSupportedContactService } from "@/lib/services";
import { isGeneralPhoneNumber } from "@/lib/contact-phone";
import { normalizeProjectBudget } from "@/lib/project-budget";

// ---------- helpers ----------
const toBool = (v: unknown) => {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v === 1;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return s === "true" || s === "1" || s === "on" || s === "yes";
  }
  return false;
};

const strOrUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() !== "" ? v.trim() : undefined;

function stringifyErr(e: unknown) {
  if (e instanceof Error) return `${e.name}: ${e.message}\n${e.stack ?? ""}`;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

function isPrismaKnownRequestError(e: unknown): e is Prisma.PrismaClientKnownRequestError {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    typeof (e as Record<string, unknown>).code === "string" &&
    "clientVersion" in e
  );
}

// ---------- handler ----------
export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const budget = normalizeProjectBudget(raw?.budgetAmount, raw?.budgetCurrency);
    if (!budget.success)
      return NextResponse.json({ success: false, error: budget.error }, { status: 400 });

    // Build data EXACTLY as your schema expects:
    // service: required string
    const firstName = strOrUndefined(raw.firstName) ?? "";
    const lastName = strOrUndefined(raw.lastName) ?? "";
    const email = strOrUndefined(raw.email) ?? "";
    const service = strOrUndefined(raw.service) ?? ""; // <-- required string
    const message = typeof raw.message === "string" ? raw.message : "";

    const data = {
      firstName,
      lastName,
      email,
      phone: strOrUndefined(raw.phone), // String?
      company: strOrUndefined(raw.company), // String?
      industry: strOrUndefined(raw.industry), // String?
      service, // REQUIRED String
      budget: budget.value, // Existing optional text column stores currency and formatted amount.
      message,
      terms: toBool(raw.terms), // Boolean (required)
    } satisfies Prisma.contactCreateInput;

    // Minimal required validation for your model
    if (!data.firstName || !data.lastName || !data.email || !data.service || !data.terms) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    if (!isSupportedContactService(data.service))
      return NextResponse.json(
        { success: false, error: "Choose a currently available service." },
        { status: 400 },
      );
    if (!isGeneralPhoneNumber(data.phone ?? ""))
      return NextResponse.json(
        { success: false, error: "Enter a valid local or international phone number." },
        { status: 400 },
      );

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { success: false, error: "Contact storage is not configured." },
        { status: 503 },
      );
    }
    const record = await getPrisma().contact.create({ data });

    // The inquiry is already stored; notification failures must not trigger a resubmission.
    const notification = await sendContactNotification(record);
    if (notification === "failed")
      console.error("Contact notification failed; the inquiry remains stored.");

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const DEBUG_ERRORS = process.env.DEBUG_ERRORS === "true";

    if (isPrismaKnownRequestError(err)) {
      if (err.code === "P2002") {
        return NextResponse.json(
          { success: false, error: "Duplicate (unique constraint) value." },
          { status: 409 },
        );
      }
      if (err.code === "P2000") {
        return NextResponse.json(
          { success: false, error: "A field is too long for its column." },
          { status: 400 },
        );
      }

      console.error("Prisma error:", err.code, stringifyErr(err));

      // return NextResponse.json(
      //     { success: false, error: 'Database error.' },
      //     { status: 500 }
      // );

      const payload: Record<string, unknown> = { success: false, error: "Internal Server Error" };
      if (DEBUG_ERRORS) payload.raw = err.code;
      return NextResponse.json(payload, { status: 500 });
    }

    console.error("Error submitting contact form:", stringifyErr(err));
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await getPrisma().$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(
      "Contact storage health check failed:",
      e instanceof Error ? e.name : "Unknown error",
    );
    return NextResponse.json(
      { ok: false, error: "Contact storage is unavailable." },
      { status: 503 },
    );
  }
}
