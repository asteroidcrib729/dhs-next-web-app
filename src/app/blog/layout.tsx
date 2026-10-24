import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Digital Horizon Systems",
  description:
    "Practical insights on website development, desktop solutions, SEO and dependable IT systems from Digital Horizon Systems.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
