"use client";

import { useState } from "react";
import Link from "next/link";
import site from "../../content/site.json";
import VaccineRegistrationModal from "../../components/VaccineRegistrationModal";
import QuickActions from "../../components/QuickActions";
import SocialLinks from "../../components/SocialLinks";
import OpeningHoursCard from "../../components/OpeningHoursCard";

export default function ContactPage() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
        {/* Page header */}
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
          <p className="mt-2 text-gray-600">
            Call, email, WhatsApp, or find us in {site.address.cityRegion}.
          </p>

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
        </section>

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
        <section className="mt-6 overflow-hidden rounded-2xl border bg-white">
          <iframe
            title="Map"
            src={site.maps.embedUrl}
            className="h-72 w-full"
            loading="lazy"
          />
        </section>

        {/* Social */}
        <section className="mt-6 rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">Social</div>
          <div className="mt-4">
            <SocialLinks variant="light" />
          </div>
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
