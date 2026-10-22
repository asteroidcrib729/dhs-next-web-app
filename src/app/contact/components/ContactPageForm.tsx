"use client";

import { useState } from "react";
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
import { Phone, Mail, MapPin, Clock, MessageSquare, Calendar } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [industry, setIndustry] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [newsletter, setNewsletter] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // ensure non-native values are present
    fd.set("industry", industry || "");
    fd.set("service", service || "");
    fd.set("budget", budget || "");
    fd.set("newsletter", String(newsletter));
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
      setNewsletter(false);
      setTerms(false);
    } catch (err) {
      setNotice("Could not send your message. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <section className="py-6">
        <div className="container mx-auto px-4 space-y-12">
          {/* Contact Form (Full Width at Top) */}
          <Card id="contact-form-card-top" className="mb-6 shadow-lg border border-gray-100">
            <CardHeader>
              <CardTitle className="text-3xl text-center font-bold text-blue-900">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      name="firstName"
                      placeholder="John"
                      className="rounded-lg placeholder:text-gray-500 text-gray-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <Input
                      name="lastName"
                      placeholder="Doe"
                      className="rounded-lg placeholder:text-gray-500 text-gray-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      className="rounded-lg placeholder:text-gray-500 text-gray-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      placeholder="(555) 123-4567"
                      className="rounded-lg placeholder:text-gray-500 text-gray-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Company & Industry */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <Input
                      name="company"
                      placeholder="Your Company"
                      className="rounded-lg placeholder:text-gray-500 text-gray-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="w-full rounded-lg text-gray-500">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent className="text-gray-500 bg-white placeholder:text-gray-500">
                        <SelectItem value="technology" className="hover:bg-blue-300">
                          Technology
                        </SelectItem>
                        <SelectItem value="healthcare" className="hover:bg-blue-300">
                          Healthcare
                        </SelectItem>
                        <SelectItem value="finance" className="hover:bg-blue-300">
                          Finance
                        </SelectItem>
                        <SelectItem value="retail" className="hover:bg-blue-300">
                          Retail
                        </SelectItem>
                        <SelectItem value="manufacturing" className="hover:bg-blue-300">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="education" className="hover:bg-blue-300">
                          Education
                        </SelectItem>
                        <SelectItem value="other" className="hover:bg-blue-300">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Services + Budget */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Services Interested In *
                    </label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger className="w-full rounded-lg text-gray-500">
                        <SelectValue placeholder="Select services" />
                      </SelectTrigger>
                      <SelectContent className="text-gray-500 bg-white placeholder:text-gray-500">
                        <SelectItem value="digital-marketing" className="hover:bg-blue-300">
                          Digital Marketing
                        </SelectItem>
                        <SelectItem value="seo" className="hover:bg-blue-300">
                          SEO Services
                        </SelectItem>
                        <SelectItem value="ppc" className="hover:bg-blue-300">
                          PPC Management
                        </SelectItem>
                        <SelectItem value="web-development" className="hover:bg-blue-300">
                          Web Development
                        </SelectItem>
                        <SelectItem value="it-solutions" className="hover:bg-blue-300">
                          IT Solutions
                        </SelectItem>
                        <SelectItem value="cloud-services" className="hover:bg-blue-300">
                          Cloud Services
                        </SelectItem>
                        <SelectItem value="cybersecurity" className="hover:bg-blue-300">
                          Cybersecurity
                        </SelectItem>
                        <SelectItem value="hardware" className="hover:bg-blue-300">
                          Hardware Solutions
                        </SelectItem>
                        <SelectItem value="consultation" className="hover:bg-blue-300">
                          Free Consultation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Budget
                    </label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger className="w-full rounded-lg text-gray-500">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent className="text-gray-500 bg-white placeholder:text-gray-500">
                        <SelectItem value="under-5k" className="hover:bg-blue-300">
                          Under $5,000
                        </SelectItem>
                        <SelectItem value="5k-15k" className="hover:bg-blue-300">
                          $5,000 - $15,000
                        </SelectItem>
                        <SelectItem value="15k-50k" className="hover:bg-blue-300">
                          $15,000 - $50,000
                        </SelectItem>
                        <SelectItem value="50k-100k" className="hover:bg-blue-300">
                          $50,000 - $100,000
                        </SelectItem>
                        <SelectItem value="over-100k" className="hover:bg-blue-300">
                          Over $100,000
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="rounded-lg placeholder:text-gray-500 text-gray-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={newsletter}
                    onCheckedChange={(v) => setNewsletter(Boolean(v))}
                    id="newsletter"
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=unchecked]:text-gray-500"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    Subscribe to our newsletter
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={terms}
                    onCheckedChange={(v) => setTerms(Boolean(v))}
                    id="terms"
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=unchecked]:text-gray-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the Terms of Service *
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3 rounded-lg shadow-md cursor-pointer"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>

                {notice && <p className="text-center text-sm text-gray-600">{notice}</p>}
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <CardDescription className="text-center text-gray-600">
                Fill out the form below and we&#39;ll get back to you within 24 hours.
              </CardDescription>
            </CardFooter>
          </Card>

          {/* Info Cards (Row on Desktop, Column on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card className="shadow-md border border-gray-100">
              <CardHeader>
                <CardTitle className="text-xl text-center font-semibold text-blue-900">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-gray-700">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">+92-304-2204258</div>
                    <div className="text-sm text-gray-500">Main Office</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">info@techventuresolution.com</div>
                    <div className="text-sm text-gray-500">General Inquiries</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">Karachi, Pakistan</div>
                    <div className="text-sm text-gray-500">Main Office</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">Mon - Fri: 9:00 AM - 6:00 PM</div>
                    <div className="text-sm text-gray-500">Saturday: 10:00 AM - 4:00 PM</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-md border border-gray-100">
              <CardHeader>
                <CardTitle className="text-xl text-center font-semibold text-blue-900">
                  Quick Actions & Emergency IT Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start rounded-lg" variant="outline">
                  <Link href="#contact-form-card-top">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule a Call
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start rounded-lg" variant="outline">
                  <Link href="#">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Live Chat Support
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  <Link href="tel:+92-304-2204258">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Link>
                </Button>
              </CardContent>
              <CardContent>
                <p className="text-sm text-center text-gray-600 mb-4">
                  Need immediate IT assistance? Our emergency support team is available 24/7.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
