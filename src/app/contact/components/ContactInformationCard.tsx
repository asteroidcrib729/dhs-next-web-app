"use client";
// Preserved for reuse; intentionally not imported by the contact page.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useSiteConfig } from "@/components/SiteConfigProvider";
export default function ContactInformationCard() {
  const config = useSiteConfig();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm text-muted-foreground">
        {config.phone && (
          <a className="flex items-center gap-3" href={config.phoneHref}>
            <Phone size={18} />
            {config.phone}
          </a>
        )}
        {config.email && (
          <a className="flex items-center gap-3" href={config.emailHref}>
            <Mail size={18} />
            {config.email}
          </a>
        )}
        {config.address && (
          <p className="flex items-center gap-3">
            <MapPin size={18} />
            {config.address}
          </p>
        )}
        {config.hours && (
          <p className="flex items-center gap-3">
            <Clock size={18} />
            {config.hours}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
