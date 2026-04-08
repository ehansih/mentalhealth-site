"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Save, Printer, RotateCcw } from "lucide-react";

const SECTIONS = [
  {
    id: "signs",
    title: "1. My warning signs",
    hint: "Thoughts, feelings, or behaviours that mean a crisis might be coming...",
    placeholder: "e.g. I start withdrawing from friends, I can't sleep, I feel completely hopeless...",
  },
  {
    id: "cope",
    title: "2. Things I can do on my own",
    hint: "Coping strategies and distractions that help me feel better...",
    placeholder: "e.g. Go for a walk, listen to music, hold ice cubes, watch a comfort show...",
  },
  {
    id: "people",
    title: "3. People and places that provide distraction",
    hint: "People I can reach out to just to talk (no need to mention the crisis)...",
    placeholder: "e.g. Call my friend Sara, visit my local library, go to a coffee shop...",
  },
  {
    id: "contacts",
    title: "4. People I can ask for help",
    hint: "People I trust who I can tell I am struggling...",
    placeholder: "e.g. Mum – 07123 456789, My counsellor – appointment Tuesdays...",
  },
  {
    id: "professionals",
    title: "5. Professionals and agencies I can contact",
    hint: "Crisis lines, therapists, emergency services...",
    placeholder: "e.g. Samaritans: 116 123, My GP: 01234 567890, A&E if I need to go immediately...",
  },
  {
    id: "safe",
    title: "6. Making my environment safe",
    hint: "Steps to reduce access to things that could hurt me...",
    placeholder: "e.g. Give medications to a family member, lock away sharp objects, stay at a friend's house...",
  },
];

const STORAGE_KEY = "haven_safety_plan";

type Plan = Record<string, string>;

export default function SafetyPlanPage() {
  const [plan, setPlan] = useState<Plan>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setPlan(JSON.parse(stored));
    } catch {}
  }, []);

  function update(id: string, value: string) {
    setPlan((p) => ({ ...p, [id]: value }));
    setSaved(false);
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    setSaved(true);
  }

  function reset() {
    if (!confirm("Clear your safety plan? This cannot be undone.")) return;
    localStorage.removeItem(STORAGE_KEY);
    setPlan({});
    setSaved(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <ShieldCheck className="h-4 w-4" />
          <span>Safety Plan Builder</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Your Personal Safety Plan</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          A safety plan is a personalised list of coping steps you create <em>before</em> a crisis.
          It stays private in your browser — nothing is sent to a server.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {SECTIONS.map((s) => (
          <Card key={s.id} className="border-border/60">
            <CardContent className="pt-5">
              <h2 className="font-semibold text-base mb-1">{s.title}</h2>
              <p className="text-xs text-muted-foreground mb-3">{s.hint}</p>
              <Textarea
                value={plan[s.id] ?? ""}
                onChange={(e) => update(s.id, e.target.value)}
                placeholder={s.placeholder}
                rows={3}
                className="text-sm resize-none"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex gap-2">
          <Button onClick={save} className="gap-2">
            <Save className="h-4 w-4" />
            {saved ? "Saved!" : "Save to device"}
          </Button>
          <Button variant="outline" onClick={() => window.print()} className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={reset} className="gap-1 text-muted-foreground">
          <RotateCcw className="h-3.5 w-3.5" />
          Clear all
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        Your plan is saved only on this device. No account needed. No data leaves your browser.
      </p>
    </div>
  );
}
