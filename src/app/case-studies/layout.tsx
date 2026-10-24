import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies - Digital Horizon Systems",
  description:
    "Explore website, desktop software and IT infrastructure case studies from Digital Horizon Systems.",
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
