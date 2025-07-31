import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const {
    contactName,
    email, // this is the user's email from the form
    companyName,
    companyWebsite,
    phone,
    sponsorshipLevel,
    message,
  } = body;

  try {
    const { error } = await resend.emails.send({
      from: "Sponsor Form <noreply@teamsammard.onresend.com>",
      to: "teamsammard@gmail.com", 
      replyTo: email, 
      subject: `Sponsor Interest: ${companyName}`,
      html: `
        <h2>New Sponsorship Request</h2>
        <p><strong>Contact Name:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Website:</strong> ${companyWebsite}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Sponsorship Level:</strong> ${sponsorshipLevel || "Not specified"}</p>
        <p><strong>Message:</strong><br/>${message || "No message."}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
