"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type NavItem = { href: string; label: string };

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      aria-hidden
      focusable="false"
    >
      {/* We use a group with explicit transform origin via inline styles */}
      <g
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      >
        {/* Top */}
        <line
          x1="5"
          y1="7"
          x2="19"
          y2="7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            transition: "transform 200ms ease, opacity 200ms ease",
            transform: open ? "translateY(5px) rotate(45deg)" : "none",
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
        {/* Middle */}
        <line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            transition: "opacity 150ms ease",
            opacity: open ? 0 : 1,
          }}
        />
        {/* Bottom */}
        <line
          x1="5"
          y1="17"
          x2="19"
          y2="17"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            transition: "transform 200ms ease, opacity 200ms ease",
            transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
      </g>
    </svg>
  );
}


export default function Header({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[var(--brand-blue)] text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo.jpg"
            alt="Sheridan's Pharmacy"
            width={180}
            height={60}
            priority
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-medium text-white/90 hover:text-white hover:underline"
            >
              {n.label}
            </Link>
          ))}

          <Link
            href="/vaccines"
            className="btn-primary ml-3 rounded-xl px-4 py-2 text-sm font-semibold"
          >
            Vaccine Registration
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-white/40 p-2 text-white transition hover:bg-white/10 active:scale-[0.98] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <MenuIcon open={open} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={[
          "md:hidden",
          "overflow-hidden border-t border-white/20 bg-[var(--brand-blue)]",
          "transition-[max-height,opacity] duration-200 ease-out",
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="grid gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {n.label}
              </Link>
            ))}
          </div>

          <Link
            href="/vaccines"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4 block rounded-xl px-3 py-3 text-center text-sm font-semibold"
          >
            Vaccine Registration
          </Link>
        </div>
      </div>
    </header>
  );
}
