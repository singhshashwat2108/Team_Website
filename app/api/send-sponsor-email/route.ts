import { NextResponse } from "next/server";
import { Resend } from "resend";

// Safely initialize Resend only if API key is present to avoid build-time failure
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

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
    nickname,         
    contactName,
    email,
    companyName,
    companyWebsite,
    phone,
    sponsorshipLevel,
    message,
    turnstileToken,   
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

  // ——— Turnstile Verification ———
  try {
    const captchaRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(
          process.env.TURNSTILE_SECRET_KEY!
        )}&response=${encodeURIComponent(turnstileToken || "")}`,
      }
    );

    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      console.error("Turnstile verification failed:", captchaData);
      return NextResponse.json(
        { error: "Captcha verification failed" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Error verifying Turnstile:", err);
    return NextResponse.json(
      { error: "Captcha verification error" },
      { status: 500 }
    );
  }

  // If email service not configured, skip sending but report success (prevents build errors when key absent)
  if (!resend) {
    console.warn("RESEND_API_KEY missing – skipping email send.");
    return NextResponse.json({ success: true, skipped: true });
  }

  // ——— Send email ———
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
