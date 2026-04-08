import { Resend } from "resend";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const TO_EMAIL = process.env.CONTACT_EMAIL ?? "";
  const FROM_EMAIL = process.env.FROM_EMAIL ?? "noreply@youarenotalone.org";

  if (!process.env.RESEND_API_KEY || !TO_EMAIL) {
    return Response.json(
      { error: "Email service not configured. Please try a crisis hotline." },
      { status: 503 }
    );
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!message || message.trim().length < 5) {
    return Response.json({ error: "Message is too short." }, { status: 400 });
  }

  // Sanitize inputs
  const safeName = (name ?? "Anonymous").replace(/[<>]/g, "").slice(0, 100);
  const safeEmail = (email ?? "not provided").replace(/[<>]/g, "").slice(0, 200);
  const safeMessage = message.replace(/[<>]/g, "").slice(0, 5000);

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New message from ${safeName} — You Are Not Alone`,
      text: [
        `New message received via youarenotalone.org`,
        ``,
        `From: ${safeName}`,
        `Email: ${safeEmail}`,
        ``,
        `Message:`,
        safeMessage,
        ``,
        `---`,
        `Sent via youarenotalone.org`,
      ].join("\n"),
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Failed to send message. Please try a crisis hotline instead." },
      { status: 500 }
    );
  }
}
