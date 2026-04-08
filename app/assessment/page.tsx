"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ClipboardList, ChevronRight, RotateCcw, ArrowRight } from "lucide-react";

// ─── PHQ-9 (Depression) ────────────────────────────────────────────────────
const PHQ9 = {
  id: "phq9",
  name: "PHQ-9",
  title: "Depression Screening",
  subtitle: "Over the last 2 weeks, how often have you been bothered by any of the following?",
  options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  questions: [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading or watching television",
    "Moving or speaking so slowly that other people could have noticed, or being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead, or of hurting yourself in some way",
  ],
  interpret(score: number) {
    if (score <= 4) return { level: "Minimal", color: "text-green-600", bg: "bg-green-50 border-green-200", advice: "Your responses suggest minimal depression symptoms. Keep doing the things that support your wellbeing — sleep, movement, and connection with others." };
    if (score <= 9) return { level: "Mild", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200", advice: "Your responses suggest mild depression symptoms. Talking to someone you trust or a counsellor may help. Consider using the breathing exercises or chatting with Haven." };
    if (score <= 14) return { level: "Moderate", color: "text-orange-600", bg: "bg-orange-50 border-orange-200", advice: "Your responses suggest moderate depression. We strongly encourage speaking with a GP or mental health professional. You don't have to face this alone." };
    if (score <= 19) return { level: "Moderately Severe", color: "text-red-500", bg: "bg-red-50 border-red-200", advice: "Your responses suggest moderately severe depression. Please reach out to a healthcare professional soon. A crisis hotline can help if you need to talk right now." };
    return { level: "Severe", color: "text-red-700", bg: "bg-red-100 border-red-300", advice: "Your responses suggest severe depression. Please contact a doctor, crisis line, or emergency services today. You deserve proper care and support." };
  },
};

// ─── GAD-7 (Anxiety) ──────────────────────────────────────────────────────
const GAD7 = {
  id: "gad7",
  name: "GAD-7",
  title: "Anxiety Screening",
  subtitle: "Over the last 2 weeks, how often have you been bothered by the following?",
  options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  questions: [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen",
  ],
  interpret(score: number) {
    if (score <= 4) return { level: "Minimal", color: "text-green-600", bg: "bg-green-50 border-green-200", advice: "Your responses suggest minimal anxiety. That's good. Keep an eye on how you're feeling over time, and use the breathing exercises if you ever feel overwhelmed." };
    if (score <= 9) return { level: "Mild", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200", advice: "Your responses suggest mild anxiety. The breathing exercises on this site may help. Speaking with a counsellor is also a good idea." };
    if (score <= 14) return { level: "Moderate", color: "text-orange-600", bg: "bg-orange-50 border-orange-200", advice: "Your responses suggest moderate anxiety. Please consider speaking with a GP or therapist. Structured support can make a real difference." };
    return { level: "Severe", color: "text-red-700", bg: "bg-red-100 border-red-300", advice: "Your responses suggest severe anxiety. Please reach out to a healthcare professional. If you're struggling right now, a crisis line is available 24/7." };
  },
};

type Assessment = typeof PHQ9 | typeof GAD7;
type Answers = number[];

type Result = {
  assessment: Assessment;
  answers: Answers;
  score: number;
};

type Stage =
  | { type: "intro" }
  | { type: "question"; assessment: Assessment; answers: Answers; index: number }
  | { type: "results"; results: Result[] };

export default function AssessmentPage() {
  const [stage, setStage] = useState<Stage>({ type: "intro" });
  const [completedResults, setCompletedResults] = useState<Result[]>([]);

  function startAssessment(assessment: Assessment) {
    setCompletedResults([]);
    setStage({ type: "question", assessment, answers: [], index: 0 });
  }

  function startBoth() {
    setCompletedResults([]);
    setStage({ type: "question", assessment: PHQ9, answers: [], index: 0 });
  }

  function answer(value: number) {
    if (stage.type !== "question") return;
    const { assessment, answers, index } = stage;
    const newAnswers = [...answers, value];

    if (index + 1 < assessment.questions.length) {
      setStage({ type: "question", assessment, answers: newAnswers, index: index + 1 });
    } else {
      // This assessment done
      const score = newAnswers.reduce((a, b) => a + b, 0);
      const result: Result = { assessment, answers: newAnswers, score };

      if (assessment.id === "phq9") {
        // Move to GAD-7
        const allResults = [...completedResults, result];
        setCompletedResults(allResults);
        setStage({ type: "question", assessment: GAD7, answers: [], index: 0 });
      } else {
        const allResults = [...completedResults, result];
        setStage({ type: "results", results: allResults });
      }
    }
  }

  function restart() {
    setCompletedResults([]);
    setStage({ type: "intro" });
  }

  // ── Intro ────────────────────────────────────────────────────────────────
  if (stage.type === "intro") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <ClipboardList className="h-4 w-4" />
          <span>Mental Health Check-In</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">How are you really doing?</h1>
        <p className="text-muted-foreground leading-relaxed mb-2">
          These are two of the most trusted screening tools used by doctors worldwide.
          They take about 3 minutes and can help you understand what you&apos;re experiencing.
        </p>
        <p className="text-xs text-muted-foreground mb-10 italic">
          This is not a diagnosis. Results are private and never stored.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card className="border-primary/20 text-left hover:border-primary/50 transition-colors">
            <CardContent className="pt-5">
              <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">PHQ-9</div>
              <h3 className="font-semibold text-base mb-1">Depression Screening</h3>
              <p className="text-sm text-muted-foreground mb-4">9 questions · ~2 min</p>
              <Button size="sm" variant="outline" className="w-full" onClick={() => startAssessment(PHQ9)}>
                Start <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
          <Card className="border-primary/20 text-left hover:border-primary/50 transition-colors">
            <CardContent className="pt-5">
              <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">GAD-7</div>
              <h3 className="font-semibold text-base mb-1">Anxiety Screening</h3>
              <p className="text-sm text-muted-foreground mb-4">7 questions · ~1 min</p>
              <Button size="sm" variant="outline" className="w-full" onClick={() => startAssessment(GAD7)}>
                Start <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Button size="lg" className="px-10" onClick={startBoth}>
          Do both (recommended)
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    );
  }

  // ── Question ─────────────────────────────────────────────────────────────
  if (stage.type === "question") {
    const { assessment, answers, index } = stage;
    const total = assessment.questions.length;
    const progress = (index / total) * 100;
    const isLastQ = index === total - 1;
    const isPHQ9Last = assessment.id === "phq9" && isLastQ;

    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
            <span>{assessment.title}</span>
            <span>{index + 1} / {total}</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <p className="text-xs text-muted-foreground mb-3">{assessment.subtitle}</p>
        <h2 className="text-xl font-semibold mb-8 leading-snug">
          {assessment.questions[index]}
        </h2>

        {/* Answer options */}
        <div className="space-y-3">
          {assessment.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => answer(i)}
              className="w-full text-left px-5 py-4 rounded-xl border border-border/60 hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium group"
            >
              <span className="inline-flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-border group-hover:border-primary flex items-center justify-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  {i}
                </span>
                {opt}
              </span>
            </button>
          ))}
        </div>

        {isPHQ9Last && (
          <p className="text-xs text-muted-foreground mt-6 text-center">
            After this, you&apos;ll complete the 7-question anxiety screening.
          </p>
        )}

        <Button variant="ghost" size="sm" onClick={restart} className="mt-8 text-muted-foreground">
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Start over
        </Button>
      </div>
    );
  }

  // ── Results ───────────────────────────────────────────────────────────────
  if (stage.type === "results") {
    const { results } = stage;
    const hasCrisisItem = results.some(
      (r) => r.assessment.id === "phq9" && r.answers[8] > 0
    );

    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Your results</h1>
          <p className="text-sm text-muted-foreground">
            These results are private and never sent anywhere.
            They are a starting point — not a diagnosis.
          </p>
        </div>

        {/* Crisis notice */}
        {hasCrisisItem && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive font-medium">
            You indicated thoughts of self-harm or death. Please reach out now —
            you matter and help is available.{" "}
            <Link href="/hotlines" className="underline font-semibold">Find a crisis line &rarr;</Link>
          </div>
        )}

        <div className="space-y-5 mb-8">
          {results.map((r) => {
            const interp = r.assessment.interpret(r.score);
            const max = r.assessment.questions.length * 3;
            return (
              <Card key={r.assessment.id} className={`border ${interp.bg}`}>
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                        {r.assessment.name}
                      </div>
                      <div className="font-semibold">{r.assessment.title}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-2xl font-bold ${interp.color}`}>{r.score}</div>
                      <div className="text-xs text-muted-foreground">out of {max}</div>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="h-1.5 bg-black/10 rounded-full mb-3">
                    <div
                      className="h-full bg-current rounded-full transition-all"
                      style={{ width: `${(r.score / max) * 100}%`, color: "inherit" }}
                    />
                  </div>

                  <div className={`text-sm font-semibold mb-1 ${interp.color}`}>
                    {interp.level}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{interp.advice}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Next steps */}
        <div className="bg-muted/40 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-sm mb-3">What to do next</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>→ <Link href="/chat" className="text-primary hover:underline">Talk to Haven</Link> — AI companion available 24/7</li>
            <li>→ <Link href="/breathing" className="text-primary hover:underline">Try a breathing exercise</Link> — calm your nervous system now</li>
            <li>→ <Link href="/safety-plan" className="text-primary hover:underline">Build a safety plan</Link> — steps to take if you feel worse</li>
            <li>→ <Link href="/hotlines" className="text-primary hover:underline">Crisis hotlines</Link> — real humans, available now</li>
          </ul>
        </div>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={restart} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Retake
          </Button>
          <Link href="/chat" className={cn(buttonVariants())}>
            Talk to Haven
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-6 text-center">
          PHQ-9 © Pfizer Inc. GAD-7 © Pfizer Inc. Both are free for clinical use.
          Results are not stored and are not a substitute for professional diagnosis.
        </p>
      </div>
    );
  }
}
