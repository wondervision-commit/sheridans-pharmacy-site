"use client";

import { useMemo } from "react";
import site from "../content/site.json";

function waLink(base: string, text: string) {
  const encoded = encodeURIComponent(text);
  return `${base}?text=${encoded}`;
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.1 9.4a16 16 0 0 0 6 6l1.07-1.08a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.9z" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M12 2a9.5 9.5 0 0 0-8.2 14.3L3 22l5.9-1.6A9.5 9.5 0 1 0 12 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.8c.2-.6.3-.6.7-.6h.6c.2 0 .4 0 .6.4l.8 1.9c.1.3.1.5-.1.7l-.5.6c-.2.2-.2.4 0 .7.6 1.1 1.5 2 2.6 2.6.3.2.5.2.7 0l.6-.5c.2-.2.4-.2.7-.1l1.9.8c.4.2.4.4.4.6v.6c0 .4 0 .5-.6.7-.6.2-1.8.4-3.4-.3-1.6-.8-3-2.1-4-3.6-1-1.5-1.3-2.8-1.1-3.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M12 22s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

type QuickActionsMode = "full" | "bar";

type Props = {
  className?: string;
  mode?: QuickActionsMode;
};

export default function QuickActions({ className = "", mode = "full" }: Props) {
  const whatsappHref = useMemo(() => {
    return waLink(site.contact.whatsappWaMe, site.contact.whatsappPrefillText);
  }, []);

  const commonBtn =
    "btn-secondary rounded-xl px-3 py-3 text-center text-sm font-semibold";

  return (
    <div
      className={[
        "grid gap-2",
        mode === "full" ? "grid-cols-3" : "grid-cols-2",
        className,
      ].join(" ")}
    >
      <a className={commonBtn} href={`tel:${site.contact.phoneTel}`}>
        <span className="inline-flex items-center justify-center gap-2">
          <PhoneIcon />
          <span>Call</span>
        </span>
      </a>

      <a
        className={commonBtn}
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
      >
        <span className="inline-flex items-center justify-center gap-2">
          <WhatsappIcon />
          <span>WhatsApp</span>
        </span>
      </a>

      {mode === "full" ? (
        <a
          className={commonBtn}
          href={site.maps.directionsUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <PinIcon />
            <span>Directions</span>
          </span>
        </a>
      ) : null}
    </div>
  );
}
