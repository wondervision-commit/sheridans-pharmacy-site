"use client";

import site from "../content/site.json";
import { FacebookIcon } from "./icons/FacebookIcon";
import { InstagramIcon } from "./icons/InstagramIcon";
import { trackEvent } from "../lib/gtag";
import type { ReactNode } from "react";

type Props = {
  variant?: "light" | "dark";
  className?: string;
  location?: string;
};

function IconButton({
  href,
  label,
  platform,
  location,
  variant,
  children,
}: {
  href: string;
  label: string;
  platform: "facebook" | "instagram";
  location: string;
  variant: "light" | "dark";
  children: ReactNode;
}) {
  const base =
    "flex h-12 w-12 items-center justify-center rounded-full border transition " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const styles =
    variant === "dark"
      ? // On brand-blue background:
        // default: white outline + white icon
        // hover: white fill + brand-blue icon (high contrast)
        "border-white text-white hover:bg-white hover:text-[var(--brand-blue)] " +
        "focus-visible:ring-white focus-visible:ring-offset-[var(--brand-blue)]"
      : // On light background:
        // default: dark outline + dark icon
        // hover: dark fill + white icon (high contrast)
        "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white " +
        "focus-visible:ring-gray-800 focus-visible:ring-offset-white";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onClick={() =>
        trackEvent("social_link_click", {
          platform,
          location,
        })
      }
      className={`${base} ${styles}`}
    >
      {children}
    </a>
  );
}

export default function SocialLinks({
  variant = "light",
  className = "",
  location = "unknown",
}: Props) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <IconButton
        href={site.social.facebook}
        label="Facebook"
        platform="facebook"
        location={location}
        variant={variant}
      >
        <FacebookIcon />
      </IconButton>
      <IconButton
        href={site.social.instagram}
        label="Instagram"
        platform="instagram"
        location={location}
        variant={variant}
      >
        <InstagramIcon />
      </IconButton>
    </div>
  );
}
