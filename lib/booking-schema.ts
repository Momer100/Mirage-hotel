import { z } from "zod";
import { roomTypes } from "@/lib/rooms";

const roomSlugs = roomTypes.map((r) => r.slug) as [string, ...string[]];

export const bookingSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name"),
    email: z.string().trim().email("Please enter a valid email address"),
    phone: z.string().trim().min(7, "Please enter a contact phone number"),
    checkIn: z.string().min(1, "Please choose a check-in date"),
    checkOut: z.string().min(1, "Please choose a check-out date"),
    guests: z.coerce.number().int().min(1, "At least 1 guest").max(20, "Please call us for larger groups"),
    rooms: z.coerce.number().int().min(1).max(10).default(1),
    roomType: z.enum([...roomSlugs, "unsure"] as [string, ...string[]]),
    specialRequests: z.string().trim().max(1000).optional().or(z.literal("")),
    // Honeypot field — real visitors never fill this in.
    company: z.string().max(0).optional().or(z.literal("")),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

export type BookingFormValues = z.infer<typeof bookingSchema>;
export type BookingFormInput = z.input<typeof bookingSchema>;
