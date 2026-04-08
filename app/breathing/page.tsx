"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Wind } from "lucide-react";

const TECHNIQUES = [
  {
    id: "478",
    name: "4-7-8 Breathing",
    description: "Calms the nervous system. Great for anxiety and sleep.",
    phases: [
      { label: "Inhale", duration: 4 },
      { label: "Hold", duration: 7 },
      { label: "Exhale", duration: 8 },
    ],
  },
  {
    id: "box",
    name: "Box Breathing",
    description: "Used by Navy SEALs. Resets your stress response quickly.",
    phases: [
      { label: "Inhale", duration: 4 },
      { label: "Hold", duration: 4 },
      { label: "Exhale", duration: 4 },
      { label: "Hold", duration: 4 },
    ],
  },
  {
    id: "simple",
    name: "Simple Calm",
    description: "Easy to start with. Just breathe slowly.",
    phases: [
      { label: "Inhale", duration: 4 },
      { label: "Exhale", duration: 6 },
    ],
  },
];

type Phase = { label: string; duration: number };

export default function BreathingPage() {
  const [techniqueId, setTechniqueId] = useState("478");
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const technique = TECHNIQUES.find((t) => t.id === techniqueId)!;
  const phases: Phase[] = technique.phases;
  const currentPhase = phases[phaseIndex];

  function stop() {
    if (timerRef.current) clearInterval(timerRef.current);
    setRunning(false);
    setPhaseIndex(0);
    setSecondsLeft(phases[0].duration);
    setCycles(0);
  }

  function start() {
    setPhaseIndex(0);
    setSecondsLeft(phases[0].duration);
    setCycles(0);
    setRunning(true);
  }

  useEffect(() => {
    stop();
    setSecondsLeft(phases[0].duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [techniqueId]);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setPhaseIndex((pi) => {
            const next = (pi + 1) % phases.length;
            if (next === 0) setCycles((c) => c + 1);
            setSecondsLeft(phases[next].duration);
            return next;
          });
          return phases[phaseIndex].duration;
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phaseIndex, techniqueId]);

  const totalDuration = phases.reduce((a, p) => a + p.duration, 0);
  const elapsed = phases.slice(0, phaseIndex).reduce((a, p) => a + p.duration, 0) +
    (currentPhase.duration - secondsLeft);
  const progress = running ? elapsed / totalDuration : 0;

  const isExpanding = currentPhase?.label === "Inhale";
  const isHolding = currentPhase?.label === "Hold";
  const scale = running
    ? isExpanding ? 1.25 : isHolding ? 1.25 : 0.85
    : 1;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
        <Wind className="h-4 w-4" />
        <span>Breathing Exercises</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Breathe with me.</h1>
      <p className="text-muted-foreground mb-8">Slow your breath, slow your mind. Follow the circle.</p>

      {/* Technique selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {TECHNIQUES.map((t) => (
          <button
            key={t.id}
            onClick={() => { stop(); setTechniqueId(t.id); }}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              techniqueId === t.id
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mb-10">{technique.description}</p>

      {/* Animated circle */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative flex items-center justify-center w-52 h-52">
          {/* Outer ring progress */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5"
              className="text-primary/10" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2"
              className="text-primary transition-all duration-1000"
              strokeDasharray={`${2 * Math.PI * 46}`}
              strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress)}`}
              strokeLinecap="round"
            />
          </svg>

          {/* Breathing circle */}
          <div
            className="w-32 h-32 rounded-full bg-primary/20 border-2 border-primary/40 flex flex-col items-center justify-center transition-all"
            style={{
              transform: `scale(${scale})`,
              transitionDuration: running
                ? isExpanding ? `${currentPhase.duration * 1000}ms`
                : isHolding ? "300ms"
                : `${currentPhase.duration * 1000}ms`
                : "300ms",
              transitionTimingFunction: isExpanding ? "ease-in" : isHolding ? "linear" : "ease-out",
            }}
          >
            <span className="text-primary font-semibold text-sm">
              {running ? currentPhase.label : "Ready"}
            </span>
            {running && (
              <span className="text-2xl font-bold text-primary">{secondsLeft}</span>
            )}
          </div>
        </div>
      </div>

      {/* Cycles */}
      {running && (
        <p className="text-sm text-muted-foreground mb-6">
          Cycle {cycles + 1} — keep going, you&apos;re doing great
        </p>
      )}

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        {!running ? (
          <Button size="lg" onClick={start} className="px-10">
            Start
          </Button>
        ) : (
          <Button size="lg" variant="outline" onClick={stop}>
            Stop
          </Button>
        )}
      </div>

      {/* Phase guide */}
      <div className="mt-10 flex flex-wrap gap-3 justify-center">
        {phases.map((p, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
              running && phaseIndex === i
                ? "bg-primary/10 border-primary text-primary font-medium"
                : "border-border text-muted-foreground"
            }`}
          >
            {p.label} <span className="font-semibold">{p.duration}s</span>
          </div>
        ))}
      </div>
    </div>
  );
}
