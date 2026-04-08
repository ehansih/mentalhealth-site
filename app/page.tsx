import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Phone, MessageCircle, Globe, ShieldCheck, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Emergency Banner */}
      <div className="bg-destructive/10 border-b border-destructive/20 text-center py-3 px-4">
        <p className="text-sm font-medium text-destructive">
          If you are in immediate danger, call{" "}
          <strong>emergency services (911 / 999 / 112)</strong> right now.
        </p>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10 py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Heart className="h-4 w-4 fill-primary" />
            <span>Free · Anonymous · Always Here</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight mb-6">
            You Are{" "}
            <span className="text-primary">Not Alone.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Whatever you are going through right now — pain, darkness, or simply
            needing someone to listen — we are here. Reach out anonymously,
            anytime, from anywhere in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "text-base px-8")}>
              Talk to Someone Now
            </Link>
            <Link href="/hotlines" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "text-base px-8")}>
              Find a Crisis Hotline
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            How We Can Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Send a Message</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Write to us anonymously. No name required. No judgment. We
                  read every message and reply with care.
                </p>
                <Link
                  href="/contact"
                  className="inline-block mt-4 text-sm text-primary font-medium hover:underline"
                >
                  Send a message &rarr;
                </Link>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Crisis Hotlines</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Trained crisis counselors are available 24/7 in your country.
                  Find the right number for your location.
                </p>
                <Link
                  href="/hotlines"
                  className="inline-block mt-4 text-sm text-primary font-medium hover:underline"
                >
                  Find your hotline &rarr;
                </Link>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Global Support</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Resources for over 50 countries. No matter where you are in
                  the world, help is available.
                </p>
                <Link
                  href="/hotlines"
                  className="inline-block mt-4 text-sm text-primary font-medium hover:underline"
                >
                  Browse all countries &rarr;
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Your Privacy is Sacred</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/60 text-left">
              <Lock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Completely Anonymous</h3>
                <p className="text-xs text-muted-foreground">
                  You never need to share your name, phone number, or any
                  identifying information.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/60 text-left">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-sm mb-1">No Data Sold, Ever</h3>
                <p className="text-xs text-muted-foreground">
                  We do not track you, sell your data, or share anything you
                  tell us with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 bg-primary text-primary-foreground text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            It takes courage to reach out.
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            You have already taken the first step by coming here. We are proud
            of you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "text-base px-8")}>
              Reach Out Now
            </Link>
            <Link
              href="/hotlines"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "text-base px-8 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground")}
            >
              Emergency Hotlines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
