"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type NavItem = { href: string; label: string };

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
          className="rounded-lg border border-white/40 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          Menu
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-white/20 bg-[var(--brand-blue)] md:hidden">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <div className="grid gap-1">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white"
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
      )}
    </header>
  );
}
