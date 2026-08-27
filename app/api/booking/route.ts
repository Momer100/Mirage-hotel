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
    await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL || "Mirage Hotel Website <bookings@resend.dev>",
      to: toAddress,
      replyTo: email,
      subject: `Booking request from ${fullName} (${checkIn} → ${checkOut})`,
      text: summaryText,
      html: `
        <div style="font-family: Georgia, serif; color:#111;">
          <h2 style="margin-bottom:4px;">New booking request</h2>
          <p style="color:#555; margin-top:0;">${siteConfig.name}</p>
          <table cellpadding="6" style="border-collapse: collapse;">
            <tbody>
              <tr><td><strong>Name</strong></td><td>${fullName}</td></tr>
              <tr><td><strong>Email</strong></td><td>${email}</td></tr>
              <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
              <tr><td><strong>Check-in</strong></td><td>${checkIn}</td></tr>
              <tr><td><strong>Check-out</strong></td><td>${checkOut}</td></tr>
              <tr><td><strong>Guests</strong></td><td>${guests}</td></tr>
              <tr><td><strong>Rooms requested</strong></td><td>${rooms}</td></tr>
              <tr><td><strong>Room type</strong></td><td>${roomName}</td></tr>
              <tr><td valign="top"><strong>Special requests</strong></td><td>${
                specialRequests ? specialRequests.replace(/\n/g, "<br/>") : "None"
              }</td></tr>
            </tbody>
          </table>
        </div>
      `,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[booking] Failed to send email:", err);
    return NextResponse.json(
      { error: "We couldn't send your request automatically. Please call or email us directly." },
      { status: 502 }
    );
  }
}
