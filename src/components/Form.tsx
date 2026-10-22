"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import styles from "./Form.module.css";

export default function Form({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 py-6 px-4", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className={`${styles["form-background"]} p-6 md:p-8 bg-black`}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Contact Us</h1>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="name" placeholder="John Doe" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="query">Query</Label>
                </div>
                <Textarea id="query" className="h-8" required />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-950 hover:bg-green-500 cursor-pointer"
              >
                Submit
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/images/about/our-story.webp"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4]"
              width={5464}
              height={8192}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
