"use client";

import { useState } from "react";
import site from "../content/site.json";
import VaccineRegistrationModal from "../components/VaccineRegistrationModal";
import QuickActions from "../components/QuickActions";
import OpeningHoursCard from "../components/OpeningHoursCard";
import PageHero from "../components/PageHero";
import MapSection from "../components/MapSection";
import MobileActionBar from "../components/MobileActionBar";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
        <PageHero title={site.businessName} subtitle={site.tagline}>
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
        </PageHero>

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
        <MapSection embedUrl={site.maps.embedUrl} className="mt-6" />
      </main>

      {/* Sticky mobile action bar */}
      <MobileActionBar onVaccineClick={() => setOpenModal(true)} />

      <VaccineRegistrationModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        bookingUrl={site.integrations.epharmacyBookingUrl}
      />
    </>
  );
}
