"use client";

import { useState } from "react";
import { contactServiceOptions } from "@/lib/services";
import { isGeneralPhoneNumber } from "@/lib/contact-phone";
import {
  formatBudgetInput,
  normalizeProjectBudget,
  type BudgetCurrency,
} from "@/lib/project-budget";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function ContactPage() {
  const [industry, setIndustry] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [budgetCurrency, setBudgetCurrency] = useState<BudgetCurrency>("PKR");
  const [terms, setTerms] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedBudget = normalizeProjectBudget(budget, budgetCurrency);
    if (!parsedBudget.success) {
      setNotice(parsedBudget.error);
      return;
    }
    setNotice("");
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const phone = String(fd.get("phone") ?? "");
    if (!isGeneralPhoneNumber(phone)) {
      setNotice("Enter a valid local or international phone number, with an optional extension.");
      setLoading(false);
      return;
    }

    // ensure non-native values are present
    fd.set("industry", industry || "");
    fd.set("service", service || "");
    fd.set("budgetAmount", budget);
    fd.set("budgetCurrency", budgetCurrency);
    fd.set("terms", String(terms));

    const data = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Request failed");
      setNotice("Message sent! We’ll get back to you within 24 hours.");
      form.reset();
      setIndustry("");
      setService("");
      setBudget("");
      setBudgetCurrency("PKR");
      setTerms(false);
    } catch (err) {
      setNotice("Could not send your message. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-12">
          {/* Contact Form (Full Width at Top) */}
          <Card id="contact-form-card-top" className="mb-6 shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="text-3xl text-center font-bold text-foreground">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="contact-form space-y-6">
                {/* Name */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-firstName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      First Name *
                    </label>
                    <Input
                      id="contact-firstName"
                      name="firstName"
                      placeholder="Your first name"
                      className="rounded-lg placeholder:text-gray-500 text-gray-500 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-lastName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Last Name *
                    </label>
                    <Input
                      id="contact-lastName"
                      name="lastName"
                      placeholder="Your last name"
                      className="rounded-lg placeholder:text-gray-500 text-gray-500 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      className="rounded-lg placeholder:text-gray-500 text-gray-500 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="Country code and phone number"
                      aria-describedby="contact-phone-help"
                      className="rounded-lg placeholder:text-gray-500 text-gray-500 focus:ring-2 focus:ring-primary"
                    />
                    <p id="contact-phone-help" className="mt-2 text-xs text-muted-foreground">
                      Local and international numbers accepted, including extensions.
                    </p>
                  </div>
                </div>

                {/* Company & Industry */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Company Name
                    </label>
                    <Input
                      id="contact-company"
                      name="company"
                      placeholder="Your Company"
                      className="rounded-lg placeholder:text-gray-500 text-gray-500 focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-industry"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Industry
                    </label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger
                        id="contact-industry"
                        className="w-full rounded-lg text-gray-500"
                      >
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent className="text-gray-500 bg-white placeholder:text-gray-500">
                        <SelectItem value="technology" className="hover:bg-secondary">
                          Technology
                        </SelectItem>
                        <SelectItem value="healthcare" className="hover:bg-secondary">
                          Healthcare
                        </SelectItem>
                        <SelectItem value="finance" className="hover:bg-secondary">
                          Finance
                        </SelectItem>
                        <SelectItem value="retail" className="hover:bg-secondary">
                          Retail
                        </SelectItem>
                        <SelectItem value="manufacturing" className="hover:bg-secondary">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="education" className="hover:bg-secondary">
                          Education
                        </SelectItem>
                        <SelectItem value="other" className="hover:bg-secondary">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Services + Budget */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Services Interested In *
                    </label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger
                        id="contact-service"
                        className="w-full rounded-lg text-gray-500"
                      >
                        <SelectValue placeholder="Select services" />
                      </SelectTrigger>
                      <SelectContent className="text-foreground bg-white">
                        {contactServiceOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="hover:bg-secondary"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="project-budget"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Project Budget
                    </label>
                    <div className="flex items-center gap-2">
                      <label htmlFor="budget-currency" className="sr-only">
                        Budget currency
                      </label>
                      <Select
                        name="budgetCurrency"
                        value={budgetCurrency}
                        onValueChange={(value) => setBudgetCurrency(value as BudgetCurrency)}
                      >
                        <SelectTrigger
                          id="budget-currency"
                          aria-label="Budget currency"
                          className="w-24 shrink-0 rounded-lg text-foreground"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="min-w-0 rounded-lg bg-white text-foreground">
                          <SelectItem value="PKR">PKR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="project-budget"
                        name="budgetAmount"
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        placeholder="e.g. 10,000"
                        value={budget}
                        maxLength={22}
                        aria-describedby="project-budget-help"
                        className="min-w-0 flex-1 rounded-lg tabular-nums placeholder:text-gray-500 text-foreground focus:ring-2 focus:ring-primary"
                        onChange={(event) => {
                          const input = event.currentTarget;
                          const next = formatBudgetInput(input.value);
                          if (next === null) return;
                          const beforeCaret = input.value
                            .slice(0, input.selectionStart ?? input.value.length)
                            .replaceAll(",", "");
                          const position =
                            beforeCaret.length + (beforeCaret.startsWith(".") ? 1 : 0);
                          setBudget(next);
                          requestAnimationFrame(() => {
                            if (document.activeElement !== input) return;
                            let caret = 0;
                            let characters = 0;
                            while (caret < next.length && characters < position) {
                              if (next[caret] !== ",") characters++;
                              caret++;
                            }
                            input.setSelectionRange(caret, caret);
                          });
                        }}
                        onBlur={() =>
                          setBudget((current) => formatBudgetInput(current, true) ?? current)
                        }
                      />
                    </div>
                    <p id="project-budget-help" className="mt-2 text-xs text-muted-foreground">
                      Optional. Choose PKR or USD and enter an amount; commas are added
                      automatically.
                    </p>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="h-40 min-h-40 max-h-40 resize-none overflow-y-auto rounded-lg placeholder:text-gray-500 text-gray-500 focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={terms}
                    onCheckedChange={(v) => setTerms(Boolean(v))}
                    id="terms"
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=unchecked]:text-gray-500"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the Terms of Service *
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary text-lg py-3 rounded-lg shadow-md cursor-pointer"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>

                {notice && (
                  <p role="status" className="text-center text-sm text-muted-foreground">
                    {notice}
                  </p>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <CardDescription className="text-center text-muted-foreground">
                Fill out the form above and we&#39;ll get back to you within 24 hours.
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
