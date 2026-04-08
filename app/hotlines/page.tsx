import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Globe } from "lucide-react";

type Hotline = {
  name: string;
  number: string;
  hours?: string;
  website?: string;
  note?: string;
};

type Region = {
  region: string;
  countries: {
    country: string;
    flag: string;
    hotlines: Hotline[];
  }[];
};

const data: Region[] = [
  {
    region: "International",
    countries: [
      {
        country: "International",
        flag: "🌍",
        hotlines: [
          { name: "Befrienders Worldwide", number: "findahelpline.com", website: "https://www.befrienders.org", note: "Find a hotline in your country" },
          { name: "International Association for Suicide Prevention", number: "iasp.info/resources/Crisis_Centres", website: "https://www.iasp.info/resources/Crisis_Centres/", note: "Crisis centre directory" },
        ],
      },
    ],
  },
  {
    region: "North America",
    countries: [
      {
        country: "United States",
        flag: "🇺🇸",
        hotlines: [
          { name: "988 Suicide & Crisis Lifeline", number: "988", hours: "24/7", website: "https://988lifeline.org" },
          { name: "Crisis Text Line", number: "Text HOME to 741741", hours: "24/7", note: "Text-based support" },
          { name: "Veterans Crisis Line", number: "988 then press 1", hours: "24/7" },
          { name: "Trevor Project (LGBTQ+)", number: "1-866-488-7386", hours: "24/7", website: "https://www.thetrevorproject.org" },
        ],
      },
      {
        country: "Canada",
        flag: "🇨🇦",
        hotlines: [
          { name: "Talk Suicide Canada", number: "1-833-456-4566", hours: "24/7", website: "https://talksuicide.ca" },
          { name: "Crisis Text Line Canada", number: "Text HOME to 686868", hours: "24/7" },
          { name: "Kids Help Phone", number: "1-800-668-6868", hours: "24/7", note: "Under 20" },
        ],
      },
      {
        country: "Mexico",
        flag: "🇲🇽",
        hotlines: [
          { name: "SAPTEL", number: "55 5259-8121", hours: "24/7" },
          { name: "CONASAMA Crisis Line", number: "800-290-0024", hours: "24/7" },
        ],
      },
    ],
  },
  {
    region: "Europe",
    countries: [
      {
        country: "United Kingdom",
        flag: "🇬🇧",
        hotlines: [
          { name: "Samaritans", number: "116 123", hours: "24/7", website: "https://www.samaritans.org" },
          { name: "PAPYRUS (Under 35)", number: "0800 068 4141", hours: "Mon–Fri 9am–midnight, weekends 2pm–midnight" },
          { name: "Crisis Text Line UK", number: "Text SHOUT to 85258", hours: "24/7" },
        ],
      },
      {
        country: "Ireland",
        flag: "🇮🇪",
        hotlines: [
          { name: "Samaritans Ireland", number: "116 123", hours: "24/7" },
          { name: "Pieta House", number: "116 123", hours: "24/7" },
        ],
      },
      {
        country: "Germany",
        flag: "🇩🇪",
        hotlines: [
          { name: "Telefonseelsorge", number: "0800 111 0 111 or 0800 111 0 222", hours: "24/7" },
        ],
      },
      {
        country: "France",
        flag: "🇫🇷",
        hotlines: [
          { name: "Numéro National de Prévention du Suicide", number: "3114", hours: "24/7" },
          { name: "SOS Amitié", number: "09 72 39 40 50", hours: "24/7" },
        ],
      },
      {
        country: "Netherlands",
        flag: "🇳🇱",
        hotlines: [
          { name: "113 Zelfmoordpreventie", number: "113 or 0800-0113", hours: "24/7", website: "https://www.113.nl" },
        ],
      },
      {
        country: "Spain",
        flag: "🇪🇸",
        hotlines: [
          { name: "Telèfon de l'Esperança", number: "93 414 48 48", hours: "24/7" },
          { name: "Teléfono de la Esperanza", number: "717 003 717", hours: "24/7" },
        ],
      },
      {
        country: "Italy",
        flag: "🇮🇹",
        hotlines: [
          { name: "Telefono Amico", number: "02 2327 2327", hours: "Daily 10am–midnight" },
          { name: "Telefono Azzurro (children)", number: "19696", hours: "24/7" },
        ],
      },
      {
        country: "Sweden",
        flag: "🇸🇪",
        hotlines: [
          { name: "Mind Självmordslinjen", number: "90101", hours: "24/7" },
        ],
      },
      {
        country: "Norway",
        flag: "🇳🇴",
        hotlines: [
          { name: "Mental Helse Hjelpetelefonen", number: "116 123", hours: "24/7" },
        ],
      },
      {
        country: "Denmark",
        flag: "🇩🇰",
        hotlines: [
          { name: "Livslinien", number: "70 201 201", hours: "24/7" },
        ],
      },
      {
        country: "Finland",
        flag: "🇫🇮",
        hotlines: [
          { name: "Mieli Kriisipuhelin", number: "09 2525 0111", hours: "24/7" },
        ],
      },
      {
        country: "Portugal",
        flag: "🇵🇹",
        hotlines: [
          { name: "SOS Voz Amiga", number: "213 544 545", hours: "Daily 4pm–midnight" },
          { name: "Voz de Apoio", number: "225 506 070", hours: "Daily 9pm–midnight" },
        ],
      },
      {
        country: "Poland",
        flag: "🇵🇱",
        hotlines: [
          { name: "Telefon Zaufania dla Dorosłych", number: "116 123", hours: "24/7" },
        ],
      },
      {
        country: "Russia",
        flag: "🇷🇺",
        hotlines: [
          { name: "Телефон доверия", number: "8-800-2000-122", hours: "24/7", note: "Free" },
        ],
      },
    ],
  },
  {
    region: "Asia-Pacific",
    countries: [
      {
        country: "Australia",
        flag: "🇦🇺",
        hotlines: [
          { name: "Lifeline", number: "13 11 14", hours: "24/7", website: "https://www.lifeline.org.au" },
          { name: "Beyond Blue", number: "1300 22 4636", hours: "24/7", website: "https://www.beyondblue.org.au" },
          { name: "Kids Helpline", number: "1800 55 1800", hours: "24/7", note: "Under 25" },
        ],
      },
      {
        country: "New Zealand",
        flag: "🇳🇿",
        hotlines: [
          { name: "Lifeline NZ", number: "0800 543 354", hours: "24/7" },
          { name: "Youthline", number: "0800 376 633", hours: "24/7" },
        ],
      },
      {
        country: "India",
        flag: "🇮🇳",
        hotlines: [
          { name: "iCall", number: "9152987821", hours: "Mon–Sat 8am–10pm", website: "https://icallhelpline.org" },
          { name: "Vandrevala Foundation", number: "1860-2662-345", hours: "24/7" },
          { name: "Snehi", number: "044-24640050", hours: "24/7" },
        ],
      },
      {
        country: "Japan",
        flag: "🇯🇵",
        hotlines: [
          { name: "Inochi no Denwa", number: "0120-783-556", hours: "Daily 16:00–21:00" },
          { name: "Befrienders Japan", number: "03-5774-0992", hours: "Daily 21:00–24:00" },
        ],
      },
      {
        country: "South Korea",
        flag: "🇰🇷",
        hotlines: [
          { name: "Korea Suicide Prevention Hotline", number: "1393", hours: "24/7" },
          { name: "Korea Crisis Line", number: "1577-0199", hours: "24/7" },
        ],
      },
      {
        country: "China",
        flag: "🇨🇳",
        hotlines: [
          { name: "Beijing Suicide Research and Prevention Center", number: "010-82951332", hours: "24/7" },
          { name: "Hope 24 Line", number: "400-161-9995", hours: "24/7" },
        ],
      },
      {
        country: "Singapore",
        flag: "🇸🇬",
        hotlines: [
          { name: "Samaritans of Singapore", number: "1767", hours: "24/7" },
          { name: "Institute of Mental Health", number: "6389-2222", hours: "24/7" },
        ],
      },
      {
        country: "Philippines",
        flag: "🇵🇭",
        hotlines: [
          { name: "National Center for Mental Health Crisis Hotline", number: "1553", hours: "24/7" },
          { name: "Hopeline", number: "02-8804-4673", hours: "24/7" },
        ],
      },
      {
        country: "Pakistan",
        flag: "🇵🇰",
        hotlines: [
          { name: "Umang Pakistan", number: "0311-7786264", hours: "Daily 10am–6pm" },
        ],
      },
      {
        country: "Bangladesh",
        flag: "🇧🇩",
        hotlines: [
          { name: "Kaan Pete Roi", number: "01779-554391", hours: "Daily 6pm–10pm" },
        ],
      },
      {
        country: "Sri Lanka",
        flag: "🇱🇰",
        hotlines: [
          { name: "CCCline", number: "1333", hours: "24/7" },
        ],
      },
    ],
  },
  {
    region: "Middle East & Africa",
    countries: [
      {
        country: "South Africa",
        flag: "🇿🇦",
        hotlines: [
          { name: "South African Depression & Anxiety Group", number: "0800 456 789", hours: "24/7" },
          { name: "Lifeline", number: "0861 322 322", hours: "24/7" },
        ],
      },
      {
        country: "Nigeria",
        flag: "🇳🇬",
        hotlines: [
          { name: "Suicide Research & Prevention Initiative", number: "08062106493", hours: "24/7" },
        ],
      },
      {
        country: "Kenya",
        flag: "🇰🇪",
        hotlines: [
          { name: "Befrienders Kenya", number: "+254 722 178 177", hours: "Daily 7pm–11pm" },
        ],
      },
      {
        country: "Israel",
        flag: "🇮🇱",
        hotlines: [
          { name: "ERAN", number: "1201", hours: "24/7" },
        ],
      },
      {
        country: "United Arab Emirates",
        flag: "🇦🇪",
        hotlines: [
          { name: "Counselling & Mental Wellbeing", number: "800 HOPE (4673)", hours: "24/7" },
        ],
      },
      {
        country: "Lebanon",
        flag: "🇱🇧",
        hotlines: [
          { name: "Embrace", number: "1564", hours: "Daily noon–midnight" },
        ],
      },
      {
        country: "Egypt",
        flag: "🇪🇬",
        hotlines: [
          { name: "Mental Health Crisis Line", number: "08008880700", hours: "24/7" },
        ],
      },
    ],
  },
  {
    region: "Latin America",
    countries: [
      {
        country: "Brazil",
        flag: "🇧🇷",
        hotlines: [
          { name: "CVV — Centro de Valorização da Vida", number: "188", hours: "24/7", website: "https://www.cvv.org.br" },
        ],
      },
      {
        country: "Argentina",
        flag: "🇦🇷",
        hotlines: [
          { name: "Centro de Asistencia al Suicida", number: "135", hours: "24/7" },
        ],
      },
      {
        country: "Chile",
        flag: "🇨🇱",
        hotlines: [
          { name: "Teléfono de la Esperanza", number: "717 003 717", hours: "24/7" },
        ],
      },
      {
        country: "Colombia",
        flag: "🇨🇴",
        hotlines: [
          { name: "Línea 106", number: "106", hours: "24/7" },
        ],
      },
    ],
  },
];

export const metadata = {
  title: "Crisis Hotlines by Country — You Are Not Alone",
  description: "Find mental health crisis hotlines and suicide prevention lines for over 50 countries worldwide.",
};

export default function HotlinesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <Phone className="h-4 w-4" />
          <span>Available 24/7 in most countries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Crisis Hotlines Worldwide</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Trained crisis counselors are ready to listen — no judgment, completely
          confidential. Find the number for your country below.
        </p>
      </div>

      <div className="space-y-12">
        {data.map((region) => (
          <section key={region.region}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              {region.region}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {region.countries.map((c) => (
                <Card key={c.country} className="border-border/60">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-2xl">{c.flag}</span>
                      {c.country}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {c.hotlines.map((h, i) => (
                      <div key={i} className="flex flex-col gap-0.5">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium">{h.name}</span>
                          {h.hours && (
                            <Badge variant="secondary" className="text-xs shrink-0">
                              {h.hours}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="text-sm font-mono text-primary font-semibold">
                            {h.number}
                          </span>
                          {h.website && (
                            <a
                              href={h.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-muted-foreground hover:text-primary transition-colors ml-1"
                            >
                              website ↗
                            </a>
                          )}
                        </div>
                        {h.note && (
                          <p className="text-xs text-muted-foreground">{h.note}</p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t see your country?{" "}
          <a
            href="https://www.befrienders.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            Befrienders Worldwide
          </a>{" "}
          and{" "}
          <a
            href="https://www.iasp.info/resources/Crisis_Centres/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            IASP Crisis Centres
          </a>{" "}
          maintain global directories updated regularly.
        </p>
      </div>
    </div>
  );
}
