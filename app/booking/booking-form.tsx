"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Loader2, PartyPopper } from "lucide-react";

import { bookingSchema, type BookingFormInput } from "@/lib/booking-schema";
import { roomTypes } from "@/lib/rooms";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { OrnamentFrame } from "@/components/site/ornament";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function BookingForm() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get("room");
  const validRoom = roomTypes.some((r) => r.slug === roomParam) ? roomParam! : "unsure";

  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<BookingFormInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: 2,
      rooms: 1,
      roomType: validRoom,
      specialRequests: "",
      company: "",
    },
  });

  React.useEffect(() => {
    form.setValue("roomType", validRoom);
  }, [validRoom, form]);

  async function onSubmit(values: BookingFormInput) {
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong");
      }

      setSubmitted(true);
      toast.success("Booking request sent", {
        description: "We'll be in touch shortly to confirm your stay.",
      });
      form.reset();
    } catch (err) {
      toast.error("Couldn't send your request", {
        description:
          err instanceof Error
            ? err.message
            : `Please call us on ${siteConfig.phone} or email ${siteConfig.email}.`,
      });
    }
  }

  if (submitted) {
    return (
      <OrnamentFrame className="border border-gold/40 bg-ink-elevated/50 p-10 text-center sm:p-14">
        <PartyPopper className="mx-auto size-8 text-gold" />
        <h3 className="mt-5 font-display text-3xl text-ivory">Request received</h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ivory-dim">
          Thank you — your booking request has been sent to the Mirage Hotel
          team. We&apos;ll come back to you at the email or phone number you
          provided to confirm availability and your {siteConfig.directBookingDiscount}%
          direct-booking rate.
        </p>
        <Button className="mt-8" variant="outline" onClick={() => setSubmitted(false)}>
          Send another request
        </Button>
      </OrnamentFrame>
    );
  }

  return (
    <OrnamentFrame className="border border-hairline bg-ink-elevated/40 p-6 sm:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
          {/* Honeypot — hidden from real guests, catches simple bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              tabIndex={-1}
              autoComplete="off"
              {...form.register("company")}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Smith" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jane@email.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="07XXX XXXXXX"
                    autoComplete="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check-in</FormLabel>
                  <FormControl>
                    <Input type="date" min={todayISO()} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check-out</FormLabel>
                  <FormControl>
                    <Input type="date" min={todayISO()} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guests</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={20}
                      {...field}
                      value={field.value as number | string}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rooms needed</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      {...field}
                      value={field.value as number | string}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a room" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="unsure">Not sure — please recommend</SelectItem>
                      {roomTypes.map((room) => (
                        <SelectItem key={room.slug} value={room.slug}>
                          {room.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special requests</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ground-floor room, late arrival, celebrating an occasion…"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-start gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-ivory-dim">
              <CheckCircle2 className="size-4 shrink-0 text-gold" />
              Booking direct saves you {siteConfig.directBookingDiscount}% — no fees added.
            </p>
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="w-full sm:w-auto">
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Sending&hellip;
                </>
              ) : (
                "Send Booking Request"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </OrnamentFrame>
  );
}
