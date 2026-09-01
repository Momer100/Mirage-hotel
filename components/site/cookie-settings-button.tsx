"use client";

import { COOKIE_SETTINGS_EVENT } from "@/components/site/cookie-consent";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT))}
      className="uppercase tracking-[0.14em] text-ivory-dim/60 transition-colors hover:text-gold"
    >
      Cookie settings
    </button>
  );
}
