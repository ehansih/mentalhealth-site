# You Are Not Alone — Global Mental Health Support

A free, anonymous mental health crisis support website built with Next.js and deployed on Vercel.

## Features

- **Anonymous contact form** — send a message without sharing your name or email
- **Crisis hotlines for 50+ countries** — organized by region
- **WhatsApp button** — direct chat link (configure your number in env vars)
- **Calm teal/green design** — mobile-first, accessible
- **Email delivery via Resend** — contact form messages go straight to your inbox

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, features, privacy section |
| `/hotlines` | Crisis hotlines by country (50+ countries) |
| `/contact` | Anonymous contact form |
| `/about` | Mission, privacy commitment, disclaimer |

## Setup

### 1. Clone & install

```bash
git clone https://github.com/ehansih/mentalhealth-site
cd mentalhealth-site
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx   # from resend.com
CONTACT_EMAIL=your@email.com             # where messages are sent
FROM_EMAIL=noreply@yourdomain.com        # must be verified in Resend
NEXT_PUBLIC_WHATSAPP_NUMBER=447911123456 # digits only, with country code
```

### 3. Run locally

```bash
npm run dev
```

### 4. Deploy to Vercel

```bash
vercel --prod
```

Add the environment variables in the Vercel dashboard under **Settings → Environment Variables**.

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS** + **shadcn/ui** (base-ui)
- **Resend** for transactional email
- **Vercel** for hosting

## License

MIT — free to use, adapt, and share.
