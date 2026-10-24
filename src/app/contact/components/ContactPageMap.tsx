// Preserved for reuse; intentionally not imported by the contact page.
import { createSiteConfig } from "@/lib/site-config";
export default function ContactPageMap() {
  const config = createSiteConfig(process.env);
  if (!config.mapEmbedUrl) return null;
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h2 className="mb-8 text-3xl font-semibold">Our Location</h2>
      <iframe
        src={config.mapEmbedUrl}
        title="Our office location"
        className="h-[450px] w-full rounded-2xl border border-border"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
