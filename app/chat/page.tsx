"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Send, Bot, User } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const busy = status === "streaming" || status === "submitted";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function submit() {
    const text = input.trim();
    if (!text || busy) return;
    sendMessage({ text });
    setInput("");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-3">
          <Heart className="h-4 w-4 fill-primary" />
          <span>Haven — Your AI Companion</span>
        </div>
        <h1 className="text-2xl font-bold">You can talk to me about anything.</h1>
        <p className="text-sm text-muted-foreground mt-1">
          I&apos;m here to listen, not to judge.{" "}
          <Link href="/hotlines" className="text-primary hover:underline">
            Need a human? Find a hotline.
          </Link>
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-muted-foreground">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Hi, I&apos;m Haven.</p>
              <p className="text-sm mt-1">Whatever you&apos;re feeling right now — I&apos;m here.<br />Start by telling me how you&apos;re doing.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-sm mt-2">
              {[
                "I'm feeling really anxious",
                "I don't know what to do",
                "I need someone to talk to",
                "Help me calm down",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => { sendMessage({ text: s }); }}
                  className="text-xs text-left px-3 py-2 rounded-lg border border-border/60 hover:bg-muted hover:border-primary/30 transition-colors text-muted-foreground"
                >
                  &ldquo;{s}&rdquo;
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-muted text-foreground rounded-tl-sm"
              }`}
            >
              {m.parts?.map((part, i) =>
                part.type === "text" ? <span key={i}>{part.text}</span> : null
              )}
            </div>
            {m.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        ))}

        {busy && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">
            Something went wrong. Please try again or{" "}
            <Link href="/hotlines" className="underline">find a hotline</Link>.
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <Card className="border-border/60 p-3 mt-2">
        <div className="flex gap-2 items-end">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me how you're feeling..."
            rows={2}
            className="resize-none border-0 focus-visible:ring-0 shadow-none p-0 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
          />
          <Button type="button" size="icon" disabled={busy || !input.trim()} onClick={submit} className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          AI companion — not a substitute for professional care. In emergency call 911/999/112.
        </p>
      </Card>
    </div>
  );
}
