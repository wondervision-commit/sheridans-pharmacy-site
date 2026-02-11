"use client";

import { useMemo } from "react";
import site from "../content/site.json";
import PhoneIcon from "./icons/PhoneIcon";
import WhatsappIcon from "./icons/WhatsappIcon";
import LocationIcon from "./icons/LocationIcon";

function waLink(base: string, text: string) {
  const encoded = encodeURIComponent(text);
  return `${base}?text=${encoded}`;
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
            <LocationIcon />
            <span>Directions</span>
          </span>
        </a>
      ) : null}
    </div>
  );
}
