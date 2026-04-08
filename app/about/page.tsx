import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Globe, Users } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "About — You Are Not Alone",
  description: "Why this site exists and our commitment to anonymous, compassionate mental health support.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-5">
          <Heart className="h-7 w-7 text-primary fill-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Why This Site Exists</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Because everyone deserves someone to talk to — no matter where they are,
          what they are going through, or whether they can afford professional care.
        </p>
      </div>

      <div className="prose prose-neutral max-w-none space-y-8 text-foreground">
        <section>
          <h2 className="text-xl font-bold mb-3">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Mental health crises do not announce themselves. They arrive at 3am, in silence,
            when every door feels locked. This site exists to leave one door open — always.
            A place to say &ldquo;I am struggling&rdquo; without fear of judgment, cost, or
            having to explain yourself.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            We are not a replacement for professional mental health care. We are a bridge —
            a first point of human connection that helps people find the courage to keep going
            and reach for more help.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
          {[
            {
              icon: Shield,
              title: "Anonymous by Design",
              body: "No login, no tracking, no data collection. You never need to share your name or any identifying information.",
            },
            {
              icon: Globe,
              title: "Global Reach",
              body: "Crisis hotlines for 50+ countries and support available in multiple languages. Help exists wherever you are.",
            },
            {
              icon: Users,
              title: "Human Connection",
              body: "Every message sent through this site is read by a real person who cares. You are not writing into a void.",
            },
            {
              icon: Heart,
              title: "No Judgment",
              body: "Whatever you are feeling — shame, rage, hopelessness, numbness — it is valid. We are here for all of it.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <Card key={title} className="border-border/60">
              <CardContent className="pt-5">
                <div className="flex items-start gap-3">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                    <Icon className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section>
          <h2 className="text-xl font-bold mb-3">Privacy Commitment</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">→</span> No cookies or tracking scripts of any kind</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">→</span> Messages are forwarded securely and not stored long-term</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">→</span> We will never sell, share, or monetize your data</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">→</span> Optional email address is only used to reply to you — nothing else</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Important Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">
            This site is not a crisis service and we are not licensed mental health professionals.
            If you are in immediate danger of harming yourself or others, please call emergency
            services (911 / 999 / 112) or go to your nearest emergency room immediately.
            The{" "}
            <Link href="/hotlines" className="text-primary hover:underline">
              crisis hotlines listed here
            </Link>{" "}
            are staffed by trained counselors and are always the best first call in an emergency.
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-6">Ready to reach out?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
            Talk to Someone
          </Link>
          <Link href="/hotlines" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Find a Hotline
          </Link>
        </div>
      </div>
    </div>
  );
}
