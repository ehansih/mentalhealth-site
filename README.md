# Haven — You Are Not Alone 💚

> A free, anonymous mental health support platform for anyone, anywhere in the world.

🔗 **Live:** https://mentalhealth-site.vercel.app

---

## What is Haven?

Haven is a safe space for people who are struggling. No sign-up. No cost. No data collected. Everything is completely anonymous.

Built because mental health support shouldn't require money, appointments, or courage to ask for help.

---

## Features

### 💬 AI Companion
Talk to Haven — an AI trained to listen with warmth, validate feelings, and suggest grounding techniques. Available 24/7. Never judges.

### 📊 Mental Health Check-In
PHQ-9 (depression) and GAD-7 (anxiety) — the same clinically validated questionnaires used by doctors worldwide. Takes 3 minutes. Results never leave your browser.

### 🌬️ Breathing Exercises
Animated guided breathing — 4-7-8, Box Breathing, and Simple Calm. Helps regulate the nervous system in real time.

### 📝 Safety Plan Builder
A structured personal plan for when things get really hard. Fill in your own coping steps, contacts, and warning signs. Saved only on your device — never uploaded.

### 📞 Crisis Hotlines
Curated hotlines and crisis lines for 50+ countries. Always one tap away.

### 🆘 Crisis Button
A persistent "I need help now" button visible on every page, linking directly to crisis resources.

---

## Privacy

- No accounts. No login. No tracking.
- Assessment results stay in your browser only.
- Safety plans saved locally — never sent to a server.
- No data sold. Ever.

---

## Running Locally

```bash
git clone https://github.com/ehansih/mentalhealth-site
cd mentalhealth-site
npm install
cp .env.example .env.local
# Add your API keys (see below)
npm run dev
```

Open http://localhost:3000

### Environment Variables

| Variable | Description | Where to get it |
|---|---|---|
| `GROQ_API_KEY` | AI chat inference | console.groq.com — free |
| `RESEND_API_KEY` | Contact form emails | resend.com — free tier |
| `CONTACT_EMAIL` | Where contact messages go | Your email |
| `FROM_EMAIL` | Sender address (verified in Resend) | Your domain |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp button (optional) | Digits only, with country code |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| AI | Groq — LLaMA 3.3 70B via Vercel AI SDK |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Email | Resend |
| Hosting | Vercel |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/chat` | AI Companion |
| `/assessment` | PHQ-9 + GAD-7 Check-In |
| `/breathing` | Guided Breathing Exercises |
| `/safety-plan` | Safety Plan Builder |
| `/hotlines` | Crisis Hotlines (50+ countries) |
| `/contact` | Anonymous Contact Form |
| `/about` | About Haven |

---

## Disclaimer

Haven is **not** a substitute for professional mental health care. If you are in immediate danger, please call your local emergency services (911 / 999 / 112) or go to your nearest emergency room.

---

Made with 💚 for everyone who needs it.
