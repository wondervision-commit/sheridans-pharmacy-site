"use client";

import { useState } from "react";
import Link from "next/link";
import site from "../../content/site.json";
import VaccineRegistrationModal from "../../components/VaccineRegistrationModal";
import QuickActions from "../../components/QuickActions";
import SocialLinks from "../../components/SocialLinks";
import OpeningHoursCard from "../../components/OpeningHoursCard";
import PageHero from "../../components/PageHero";
import MapSection from "../../components/MapSection";
import MobileActionBar from "../../components/MobileActionBar";

export default function ContactPage() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
        {/* Page header */}
        <PageHero
          title="Contact"
          subtitle={`Call, email, WhatsApp, or find us in ${site.address.cityRegion}.`}
        >
          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="btn-primary mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold"
          >
            Vaccine Registration
          </button>

          {/* Quick actions */}
          <QuickActions className="mt-3" />
        </PageHero>

        {/* Contact details */}
        <section className="mt-6 rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">Details</div>

          <div className="mt-2 text-sm text-gray-700">
            <div>
              {site.address.line1}
              {site.address.line2 ? `, ${site.address.line2}` : ""},{" "}
              {site.address.cityRegion}
            </div>
            <div>{site.address.country}</div>

            <div className="mt-3">
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
              WhatsApp: {site.contact.whatsappDisplay}
              {site.contact.faxDisplay ? ` • Fax: ${site.contact.faxDisplay}` : ""}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                className="btn-secondary rounded-xl px-3 py-3 text-center text-sm font-semibold"
                href="/downloads"
              >
                Downloads
              </Link>
              <Link
                className="btn-secondary rounded-xl px-3 py-3 text-center text-sm font-semibold"
                href="/vaccines"
              >
                Vaccines
              </Link>
            </div>
          </div>
        </section>

        {/* Opening hours */}
        <OpeningHoursCard className="mt-6" />

        {/* Map */}
        <MapSection embedUrl={site.maps.embedUrl} className="mt-6" />

        {/* Social */}
        <section className="mt-6 rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">Social</div>
          <div className="mt-4">
            <SocialLinks variant="light" />
          </div>
        </section>
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
