import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const {
    nickname,         // ← honeypot field
    contactName,
    email,
    companyName,
    companyWebsite,
    phone,
    sponsorshipLevel,
    message,
  } = body;

  // ————— Honeypot check —————
  if (nickname) {
    return NextResponse.json({ error: "Bot detected" }, { status: 400 });
  }

  // ——— Basic validation ———
  if (!contactName || !email || !companyName || !companyWebsite) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: "Sponsor Form <onboarding@resend.dev>",
      to: "singhshashwat2108@gmail.com",
      replyTo: email,
      subject: `Sponsor Interest: ${companyName}`,
      html: `
        <h2>New Sponsorship Request</h2>
        <p><strong>Contact Name:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Website:</strong> ${companyWebsite}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Sponsorship Level:</strong> ${
          sponsorshipLevel || "Not specified"
        }</p>
        <p><strong>Message:</strong><br/>${message || "No message."}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error sending email:", err);
    return NextResponse.json(
      { error: "Internal server error sending email" },
      { status: 500 }
    );
  }
}
