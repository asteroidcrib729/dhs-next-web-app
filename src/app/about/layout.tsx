import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Digital Horizon Systems",
  description:
    "How Digital Horizon Systems plans and builds websites, customized desktop software and connected IT infrastructure.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
