"use client";
// Preserved for reuse; intentionally not imported by the contact page.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import { useSiteConfig } from "@/components/SiteConfigProvider";
export default function ContactQuickActionsCard() {
  const config = useSiteConfig();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions & Emergency IT Support</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Link className="action-link action-link-secondary" href={config.consultationUrl}>
          <Calendar size={16} />
          Schedule a Call
        </Link>
        {config.whatsappHref && (
          <a
            className="action-link action-link-secondary"
            href={config.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} />
            Live Chat Support
          </a>
        )}
        {config.phone && (
          <a className="action-link" href={config.phoneHref}>
            <Phone size={16} />
            Call Now
          </a>
        )}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Need immediate IT assistance? Our emergency support team is available 24/7.
        </p>
      </CardContent>
    </Card>
  );
}
