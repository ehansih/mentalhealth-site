"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

export default function CrisisButton() {
  return (
    <Link
      href="/hotlines"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-destructive text-destructive-foreground text-sm font-semibold px-4 py-3 rounded-full shadow-lg hover:bg-destructive/90 transition-colors animate-pulse hover:animate-none"
      aria-label="I am in crisis — find help now"
    >
      <Phone className="h-4 w-4 shrink-0" />
      <span>I need help now</span>
    </Link>
  );
}
