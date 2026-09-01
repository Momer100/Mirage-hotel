"use client";

import * as React from "react";
import Script from "next/script";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "mirage-cookie-consent";
const GA_ID = "G-QMM5B31984";

/** Footer "Cookie settings" button dispatches this to reopen the banner. */
export const COOKIE_SETTINGS_EVENT = "mirage:cookie-settings";

type Consent = "accepted" | "declined";

// --- External store: the stored consent, read without a mount effect so there
// is no hydration flash. getServerSnapshot returns undefined so the banner is
// never server-rendered; the real value is read on the client after hydration.
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Consent | null {
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

function getServerSnapshot(): Consent | null | undefined {
  return undefined;
}

function setStoredConsent(value: Consent) {
  window.localStorage.setItem(STORAGE_KEY, value);
  listeners.forEach((listener) => listener());
}

// Best-effort removal of GA cookies when the user declines / opts out.
function clearGaCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (name && name.startsWith("_ga")) {
      const expired = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = name + expired;
      document.cookie = `${name}${expired}; domain=.${window.location.hostname}`;
    }
  }
}

export function CookieConsent() {
  const stored = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = React.useState(false);

  React.useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  function choose(value: Consent) {
    if (value === "declined") clearGaCookies();
    setStoredConsent(value);
    setReopened(false);
  }

  // undefined => server/first paint (hidden); null => no choice yet (show).
  const showBanner = stored === null || reopened;
  const consented = stored === "accepted";

  return (
    <>
      {/* Google Analytics loads only after the visitor accepts. */}
      {consented && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-ink-elevated/95 shadow-[0_-8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <p className="max-w-2xl text-sm leading-relaxed text-ivory-dim">
              We use cookies to understand how our site is used and to improve your experience.
              You can accept or decline analytics cookies — declining won&apos;t affect your
              booking.
            </p>
            <div className="flex shrink-0 gap-3">
              <Button variant="outline" size="sm" onClick={() => choose("declined")}>
                Decline
              </Button>
              <Button size="sm" onClick={() => choose("accepted")}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
