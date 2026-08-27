import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/ornament";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-16 text-center">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-5 font-display text-5xl text-ivory sm:text-6xl">Page Not Found</h1>
      <p className="mx-auto mt-5 max-w-md leading-relaxed text-ivory-dim">
        This page has wandered off the Promenade. Let&apos;s get you back to
        somewhere familiar.
      </p>
      <Button asChild size="lg" className="mt-10">
        <Link href="/">Return Home</Link>
      </Button>
    </section>
  );
}
