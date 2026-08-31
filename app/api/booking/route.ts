import { NextResponse } from "next/server";
import { Resend } from "resend";

import { bookingSchema } from "@/lib/booking-schema";
import { getRoomBySlug } from "@/lib/rooms";
import { siteConfig } from "@/lib/site-config";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Honeypot: if this hidden field is filled in, silently pretend success.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { fullName, email, phone, checkIn, checkOut, guests, rooms, roomType, specialRequests } =
    parsed.data;

  const roomName =
    roomType === "unsure" ? "No preference / please recommend" : getRoomBySlug(roomType)?.name ?? roomType;

  // Escape user-supplied text before interpolating into the HTML email.
  const esc = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const toAddress = process.env.BOOKING_TO_EMAIL || siteConfig.email;
  const apiKey = process.env.RESEND_API_KEY;

  const summaryText = [
    `New booking request — ${siteConfig.name}`,
    ``,
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Check-in: ${checkIn}`,
    `Check-out: ${checkOut}`,
    `Guests: ${guests}`,
    `Rooms requested: ${rooms}`,
    `Room type: ${roomName}`,
    `Special requests: ${specialRequests || "None"}`,
  ].join("\n");

  if (!apiKey) {
    // No email provider configured yet — log so the request isn't lost
    // during local development, and let the UI report success so the
    // form can still be tested end-to-end before RESEND_API_KEY is set.
    console.warn(
      "[booking] RESEND_API_KEY is not set — booking request was NOT emailed:\n" + summaryText
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL || "Mirage Hotel <onboarding@resend.dev>",
      to: toAddress,
      replyTo: email,
      subject: `Booking request from ${fullName} (${checkIn} → ${checkOut})`,
      text: summaryText,
      html: `
        <div style="font-family: Georgia, serif; color:#111;">
          <h2 style="margin-bottom:4px;">New booking request</h2>
          <p style="color:#555; margin-top:0;">${esc(siteConfig.name)}</p>
          <table cellpadding="6" style="border-collapse: collapse;">
            <tbody>
              <tr><td><strong>Name</strong></td><td>${esc(fullName)}</td></tr>
              <tr><td><strong>Email</strong></td><td>${esc(email)}</td></tr>
              <tr><td><strong>Phone</strong></td><td>${esc(phone)}</td></tr>
              <tr><td><strong>Check-in</strong></td><td>${esc(checkIn)}</td></tr>
              <tr><td><strong>Check-out</strong></td><td>${esc(checkOut)}</td></tr>
              <tr><td><strong>Guests</strong></td><td>${guests}</td></tr>
              <tr><td><strong>Rooms requested</strong></td><td>${rooms}</td></tr>
              <tr><td><strong>Room type</strong></td><td>${esc(roomName)}</td></tr>
              <tr><td valign="top"><strong>Special requests</strong></td><td>${
                specialRequests ? esc(specialRequests).replace(/\n/g, "<br/>") : "None"
              }</td></tr>
            </tbody>
          </table>
        </div>
      `,
    });

    // The Resend SDK returns errors instead of throwing — surface them.
    if (error) {
      console.error("[booking] Resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          error:
            "We couldn't send your request automatically. Please call or email us directly.",
          resendError: error.message,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true, id: data?.id });
  } catch (err) {
    console.error("[booking] Failed to send email:", err);
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        error: "We couldn't send your request automatically. Please call or email us directly.",
      },
      { status: 502 }
    );
  }
}
