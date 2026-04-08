"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Heart, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <Lock className="h-4 w-4" />
          <span>100% Anonymous &amp; Confidential</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Talk to Someone</h1>
        <p className="text-muted-foreground">
          You don&apos;t have to go through this alone. Write to us — no name needed, no judgment.
          Every message is read with care.
        </p>
      </div>

      {status === "success" ? (
        <Card className="border-primary/30 text-center">
          <CardContent className="pt-10 pb-10">
            <CheckCircle2 className="h-14 w-14 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Message Received</h2>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Thank you for reaching out. We will respond as soon as possible. You are not alone.
            </p>
            <Button onClick={() => setStatus("idle")} variant="outline">
              Send another message
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary fill-primary" />
              Send a Message
            </CardTitle>
            <CardDescription>
              Name and email are optional — you can be completely anonymous.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" htmlFor="name">
                    Name <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <Input
                    id="name"
                    placeholder="Anonymous"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email <span className="text-muted-foreground font-normal">(optional, for reply)</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="message">
                  What&apos;s on your mind? <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="message"
                  placeholder="You can share anything. We are here to listen..."
                  required
                  rows={7}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="resize-none"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                <Lock className="inline h-3 w-3 mr-1" />
                Your message is private and will never be shared with anyone.
              </p>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 p-5 rounded-xl bg-muted/40 border border-border/60 text-center">
        <p className="text-sm text-muted-foreground">
          Need immediate help?{" "}
          <Link href="/hotlines" className="text-primary font-medium hover:underline">
            Find a crisis hotline
          </Link>{" "}
          in your country — trained counselors are available 24/7.
        </p>
      </div>
    </div>
  );
}
