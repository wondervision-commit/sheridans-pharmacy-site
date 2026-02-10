"use client";

import Link from "next/link";
import site from "../../content/site.json";
import staff from "../../content/staff.json";
import StaffCard from "../../components/StaffCard";
import QuickActions from "../../components/QuickActions";

export default function AboutPage() {
  const sortedStaff = [...staff].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  );

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
      {/* Hero */}
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">About Us</h1>
        <p className="mt-2 text-gray-600">{site.tagline}</p>

        <div className="mt-4 text-sm text-gray-700">
          <p>
            We’re a local, community-focused pharmacy based in{" "}
            <span className="font-semibold">{site.address.cityRegion}</span>.
            Our aim is to make healthcare approachable, clear, and dependable.
          </p>
          <p className="mt-3">
            Whether it’s a quick visit or a longer conversation, we’re here to
            help.
          </p>
        </div>

        <QuickActions className="mt-5" />

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            className="btn-secondary rounded-xl px-3 py-3 text-center text-sm font-semibold"
            href="/vaccines"
          >
            Vaccines
          </Link>
          <Link
            className="btn-secondary rounded-xl px-3 py-3 text-center text-sm font-semibold"
            href="/contact"
          >
            Contact
          </Link>
        </div>
      </section>

      {/* Team */}
      <section className="mt-6 rounded-2xl border bg-white p-5">
        <div className="text-sm font-semibold">Meet the team</div>
        <div className="mt-1 text-sm text-gray-600">
          The people behind Sheridan’s Pharmacy.
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedStaff.map((person) => (
            <StaffCard key={person.id} person={person} />
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mt-6 rounded-2xl border bg-white p-5">
        <div className="text-sm font-semibold">What we care about</div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm font-semibold">Clear advice</div>
            <div className="mt-1 text-sm text-gray-700">
              Straight answers, explained simply.
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm font-semibold">Reliable service</div>
            <div className="mt-1 text-sm text-gray-700">
              Friendly, consistent support.
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm font-semibold">Community-first</div>
            <div className="mt-1 text-sm text-gray-700">
              Proud to serve our local area.
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm font-semibold">Respect & privacy</div>
            <div className="mt-1 text-sm text-gray-700">
              A professional and respectful environment.
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Link
            href="/contact"
            className="btn-primary w-full rounded-xl px-4 py-3 text-center text-sm font-semibold"
          >
            Contact Sheridan’s Pharmacy
          </Link>
        </div>
      </section>
    </main>
  );
}
