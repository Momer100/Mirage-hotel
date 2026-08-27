"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { type DateRange } from "react-day-picker";
import { CalendarDays, CheckCircle2, Loader2, PartyPopper } from "lucide-react";

import { cn } from "@/lib/utils";
import { bookingSchema, type BookingFormInput } from "@/lib/booking-schema";
import { roomTypes } from "@/lib/rooms";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

// Format a Date as a local yyyy-mm-dd string. Uses the local calendar day
// (not toISOString, which shifts to UTC and can roll the date back a day).
function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Parse a yyyy-mm-dd string into a local-midnight Date (avoids UTC drift).
function fromISODate(value?: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

const rangeFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatRange(from: Date, to: Date) {
  return `${rangeFormatter.format(from)} → ${rangeFormatter.format(to)}`;
}

// Show two months side by side on wider screens, one on mobile.
function useResponsiveMonths() {
  const [months, setMonths] = React.useState(1);
  React.useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const update = () => setMonths(query.matches ? 2 : 1);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return months;
}

function StayDatesField({ form }: { form: UseFormReturn<BookingFormInput> }) {
  const [open, setOpen] = React.useState(false);
  const numberOfMonths = useResponsiveMonths();

  const checkIn = form.watch("checkIn");
  const checkOut = form.watch("checkOut");

  const committed = React.useMemo<DateRange | undefined>(() => {
    const from = fromISODate(checkIn);
    if (!from) return undefined;
    return { from, to: fromISODate(checkOut) };
  }, [checkIn, checkOut]);

  const [draft, setDraft] = React.useState<DateRange | undefined>(committed);

  // Re-sync the in-popover draft with the committed value each time it opens.
  React.useEffect(() => {
    if (open) setDraft(committed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const today = React.useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const errors = form.formState.errors;
  const dateError = (errors.checkOut?.message ?? errors.checkIn?.message) as
    | string
    | undefined;

  const nights =
    draft?.from && draft?.to
      ? Math.round((draft.to.getTime() - draft.from.getTime()) / 86_400_000)
      : 0;
  const canApply = Boolean(draft?.from && draft?.to && nights >= 1);

  function apply() {
    if (!draft?.from || !draft?.to) return;
    form.setValue("checkIn", toISODate(draft.from), {
      shouldValidate: true,
      shouldDirty: true,
    });
    form.setValue("checkOut", toISODate(draft.to), {
      shouldValidate: true,
      shouldDirty: true,
    });
    setOpen(false);
  }

  function clear() {
    setDraft(undefined);
    form.setValue("checkIn", "", { shouldValidate: false });
    form.setValue("checkOut", "", { shouldValidate: false });
  }

  return (
    <div className="grid gap-2">
      <Label className={cn(dateError && "text-error")}>Your stay</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-invalid={Boolean(dateError)}
            className={cn(
              "flex h-11 w-full items-center gap-3 rounded-sm border border-hairline bg-ink-elevated/60 px-4 text-left text-sm outline-none transition-colors",
              "hover:border-gold/50 focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold",
              "aria-invalid:border-error aria-invalid:ring-error"
            )}
          >
            <CalendarDays className="size-4 shrink-0 text-gold opacity-80" />
            {committed?.from && committed?.to ? (
              <span className="text-ivory">
                {formatRange(committed.from, committed.to)}
              </span>
            ) : (
              <span className="text-ivory-dim/50">
                Select your check-in and check-out dates
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="max-w-[calc(100vw-2rem)]"
        >
          <Calendar
            mode="range"
            numberOfMonths={numberOfMonths}
            selected={draft}
            onSelect={(range) => setDraft(range)}
            disabled={{ before: today }}
            defaultMonth={committed?.from ?? today}
          />
          <div className="flex items-center justify-between gap-3 border-t border-hairline px-4 py-3">
            <p className="text-xs text-ivory-dim">
              {canApply
                ? `${nights} night${nights === 1 ? "" : "s"} selected`
                : "Pick your dates"}
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clear}
                disabled={!draft?.from}
              >
                Clear
              </Button>
              <Button type="button" size="sm" onClick={apply} disabled={!canApply}>
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {dateError ? (
        <p className="text-xs font-medium text-error">{dateError}</p>
      ) : null}
    </div>
  );
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

          <StayDatesField form={form} />

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
