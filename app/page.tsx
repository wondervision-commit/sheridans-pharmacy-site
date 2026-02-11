"use client";

import { useState } from "react";
import site from "../content/site.json";
import VaccineRegistrationModal from "../components/VaccineRegistrationModal";
import QuickActions from "../components/QuickActions";
import OpeningHoursCard from "../components/OpeningHoursCard";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
        {/* Hero */}
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">
            {site.businessName}
          </h1>
          <p className="mt-2 text-gray-600">{site.tagline}</p>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="btn-primary mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold"
          >
            Vaccine Registration
          </button>

          {/* Quick actions (Call + WhatsApp) */}
          <QuickActions mode="bar" className="mt-3" />
        </section>

        {/* Hours (above contact) */}
        <OpeningHoursCard className="mt-5" />

        {/* Contact strip */}
        <section className="mt-6 rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">Contact</div>
          <div className="mt-2 text-sm text-gray-700">
            <div>
              {site.address.line2}, {site.address.cityRegion}
            </div>
            <div className="mt-2">
              Phone:{" "}
              <a className="underline" href={`tel:${site.contact.phoneTel}`}>
                {site.contact.phoneDisplay}
              </a>
            </div>
            <div>
              Email:{" "}
              <a className="underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              WhatsApp: {site.contact.whatsappDisplay} • Fax:{" "}
              {site.contact.faxDisplay}
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="mt-6 overflow-hidden rounded-2xl border bg-white">
          <iframe
            title="Map"
            src={site.maps.embedUrl}
            className="h-72 w-full"
            loading="lazy"
          />
        </section>
      </main>

      {/* Sticky mobile action bar */}
      <div className="mobile-bar fixed inset-x-0 bottom-0 z-40 md:hidden">
        <div className="mx-auto max-w-5xl px-3 py-3">
          <div className="grid grid-cols-3 gap-2">
            <QuickActions mode="bar" className="col-span-2" />
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="btn-primary rounded-xl px-3 py-3 text-center text-sm font-semibold"
            >
              Vaccine
            </button>
          </div>
        </div>
      </div>

      <VaccineRegistrationModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        bookingUrl={site.integrations.epharmacyBookingUrl}
      />
    </>
  );
}
