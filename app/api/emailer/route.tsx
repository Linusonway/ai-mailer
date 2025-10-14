import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, subject, html } = await request.json();
    const { data, error } = await resend.emails.send({
      from: "Wiz <onboarding@resend.dev>",
      to: email,
      subject: subject,
      html: html,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data: data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
