import { Resend } from "resend";
import type { CreateEmailOptions, CreateEmailRequestOptions } from "resend";

interface ContactInquiry {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  industry?: string | null;
  service: string;
  budget?: string | null;
  message?: string | null;
}

interface NotificationEnvironment {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL_FROM?: string;
  CONTACT_EMAIL_TO?: string;
  VERCEL_ENV?: string;
}

type SendNotification = (
  payload: CreateEmailOptions,
  options: CreateEmailRequestOptions,
) => Promise<{ data: { id: string } | null; error: unknown }>;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

// Called only after persistence. Provider acceptance does not prove inbox delivery.
export async function sendContactNotification(
  record: ContactInquiry,
  environment: NotificationEnvironment = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_EMAIL_FROM: process.env.CONTACT_EMAIL_FROM,
    CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
  send?: SendNotification,
): Promise<"skipped" | "accepted" | "failed"> {
  const key = environment.RESEND_API_KEY?.trim();
  const from = environment.CONTACT_EMAIL_FROM?.trim();
  const to = environment.CONTACT_EMAIL_TO?.trim();
  if (!key || !from || !to) return "skipped";

  const fields = [
    ["Name", `${record.firstName} ${record.lastName}`],
    ["Email", record.email],
    ["Phone", record.phone || "N/A"],
    ["Company", record.company || "N/A"],
    ["Industry", record.industry || "N/A"],
    ["Service", record.service],
    ["Budget", record.budget || "N/A"],
    ["Message", record.message || ""],
  ];
  const payload: CreateEmailOptions = {
    from,
    to,
    subject: "Digital Horizon Systems: new contact inquiry",
    text: ["New inquiry received", ...fields.map(([label, value]) => `${label}: ${value}`)].join(
      "\n\n",
    ),
    html: `<html lang="en"><body><h1>New inquiry received</h1>${fields
      .map(
        ([label, value]) =>
          `<p><strong>${label}:</strong><br>${escapeHtml(value).replace(/\r?\n/g, "<br>")}</p>`,
      )
      .join("")}</body></html>`,
  };

  try {
    const sendEmail: SendNotification =
      send ?? ((message, options) => new Resend(key).emails.send(message, options));
    const result = await sendEmail(payload, {
      idempotencyKey: `dhs/${environment.VERCEL_ENV === "production" ? "production" : "preview"}/contact-inquiry/${record.id}`,
    });
    return result.error || !result.data?.id ? "failed" : "accepted";
  } catch {
    // Never log provider payloads, credentials or contact contents.
    return "failed";
  }
}
