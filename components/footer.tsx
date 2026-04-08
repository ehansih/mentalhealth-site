import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-semibold text-primary mb-3">
              <Heart className="h-4 w-4 fill-primary" />
              <span>You Are Not Alone</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A safe, anonymous space for anyone struggling. Reach out — we care
              about you.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/breathing" className="hover:text-primary transition-colors">Breathing Exercises</Link></li>
              <li><Link href="/safety-plan" className="hover:text-primary transition-colors">Safety Plan</Link></li>
              <li><Link href="/hotlines" className="hover:text-primary transition-colors">Crisis Hotlines</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Talk to Someone</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">If you are in immediate danger</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Please call your local emergency services (911, 999, 112) or go to
              your nearest emergency room immediately.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
          <p>
            This site is not a substitute for professional mental health care. All contact is anonymous and confidential.
          </p>
          <p className="mt-1">
            Made with <Heart className="inline h-3 w-3 fill-red-400 text-red-400" /> for everyone who needs it.
          </p>
        </div>
      </div>
    </footer>
  );
}
