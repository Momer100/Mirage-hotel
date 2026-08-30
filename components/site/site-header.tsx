"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-hairline bg-ink/90 backdrop-blur-md py-3"
          : "border-b border-transparent bg-gradient-to-b from-ink/70 via-ink/20 to-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Mirage Hotel"
            width={220}
            height={100}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[11px] font-medium uppercase tracking-[0.2em] transition-colors",
                  active ? "text-gold" : "text-ivory/85 hover:text-gold"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex flex-col items-end gap-0.5 leading-none">
            <a
              href={siteConfig.phoneHref}
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-ivory-dim hover:text-gold transition-colors"
            >
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.mobileHref}
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-ivory-dim hover:text-gold transition-colors"
            >
              {siteConfig.mobile}
            </a>
          </div>
          <Button asChild size="sm">
            <Link href="/booking">Book Your Stay</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              className="flex items-center justify-center rounded-sm p-2 text-gold lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>{siteConfig.name}</SheetTitle>
            <nav className="flex flex-col gap-6">
              {siteConfig.nav.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "font-display text-2xl transition-colors",
                      pathname === item.href ? "text-gold" : "text-ivory hover:text-gold"
                    )}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4 border-t border-hairline pt-6">
              <a
                href={siteConfig.phoneHref}
                className="text-sm uppercase tracking-[0.14em] text-ivory-dim hover:text-gold"
              >
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.mobileHref}
                className="text-sm uppercase tracking-[0.14em] text-ivory-dim hover:text-gold"
              >
                {siteConfig.mobile}
              </a>
              <SheetClose asChild>
                <Button asChild>
                  <Link href="/booking">Book Your Stay</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
