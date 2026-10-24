// Retained for future use; the about page intentionally does not import this section.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const capabilities = [
  {
    title: "Strategy & Marketing",
    description: "Research, positioning and campaigns shaped around business objectives.",
  },
  {
    title: "Design & Development",
    description:
      "Accessible, responsive digital experiences built with attention to usability and performance.",
  },
  {
    title: "Infrastructure & Support",
    description:
      "Practical technology planning, reliable systems and support tailored to each engagement.",
  },
];
export default function AboutPageTeams() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h2 className="mb-8 text-3xl font-semibold">Expertise that works together</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {capabilities.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
