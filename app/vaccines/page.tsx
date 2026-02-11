"use client";

import { useMemo, useState } from "react";
import QuickActions from "../../components/QuickActions";
import site from "../../content/site.json";
import VaccineRegistrationModal from "../../components/VaccineRegistrationModal";

function waLink(base: string, text: string) {
  const encoded = encodeURIComponent(text);
  return `${base}?text=${encoded}`;
}

type VaccineCard = {
  title: string;
  description: string;
  notes?: string[];
};

const VACCINES: VaccineCard[] = [
  {
    title: "COVID-19 Booster & Flu Vaccination",
    description:
      "Combined appointment where both flu and COVID-19 vaccines may be administered at the same time (where applicable).",
    notes: ["Over 18s only (as per booking options)."]
  },
  {
    title: "COVID-19 Booster Vaccine",
    description:
      "COVID-19 vaccine booster appointment. Eligibility depends on current seasonal guidance and clinical assessment.",
    notes: ["Bring ID and any relevant medical info if requested."]
  },
  {
    title: "Flu Vaccination (18 years and over)",
    description:
      "Seasonal flu vaccination for adults. Free for eligible groups; private vaccination may be available if not eligible.",
    notes: ["Over 18s only (as per booking options)."]
  },
  {
    title: "Nasal Flu Vaccination (children 2–17 years)",
    description:
      "Nasal spray flu vaccination for children aged 2–17 years (subject to eligibility and availability).",
    notes: ["A parent/guardian must attend for consent."]
  }
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I register?", a: "Tap Vaccine Registration to choose a service, pick a time, enter your details, and complete consent." },
  { q: "What should I bring?", a: "Bring photo ID if available and any relevant medical information. If you’re eligible for free vaccination, bring any supporting details if requested." },
  { q: "Can I use WhatsApp to ask a question?", a: "Yes — use the WhatsApp button to message the pharmacy." },
  { q: "Are you open on bank holidays?", a: "No — closed on Sundays and bank holidays." }
];

function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((it, idx) => {
        const open = openIndex === idx;
        return (
          <div key={it.q} className="overflow-hidden rounded-xl border bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-semibold"
              onClick={() => setOpenIndex(open ? null : idx)}
              aria-expanded={open}
            >
              <span>{it.q}</span>
              <span className="ml-3 text-gray-500">{open ? "–" : "+"}</span>
            </button>
            {open ? (
              <div className="border-t px-4 py-3 text-sm text-gray-700">{it.a}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function VaccinesPage() {
  const [openModal, setOpenModal] = useState(false);

  const whatsappHref = useMemo(() => {
    return waLink(site.contact.whatsappWaMe, site.contact.whatsappPrefillText);
  }, []);

  return (
    <>
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Vaccines</h1>
          <p className="mt-2 text-gray-600">
            Register online to select a vaccine service, choose a time, and complete consent.
          </p>

          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="btn-primary mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold"
          >
            Vaccine Registration
          </button>

          <QuickActions className="mt-3" />
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-lg font-semibold">What’s available</h2>
          <div className="grid gap-3">
            {VACCINES.map((v) => (
              <div key={v.title} className="rounded-2xl border bg-white p-5">
                <div className="text-sm font-semibold">{v.title}</div>
                <p className="mt-2 text-sm text-gray-700">{v.description}</p>
                {v.notes?.length ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600">
                    {v.notes.map((n) => <li key={n}>{n}</li>)}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-semibold">What to expect</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-700">
            <li>Select the vaccine service.</li>
            <li>Choose a time slot.</li>
            <li>Enter client details.</li>
            <li>Complete consent and submit.</li>
          </ol>

          <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm">
            <div className="font-semibold">Opening hours</div>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700">
              <div>Mon–Fri</div><div>{site.openingHours.Mon}</div>
              <div>Saturday</div><div>{site.openingHours.Sat}</div>
              <div>Sunday</div><div>{site.openingHours.Sun}</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">{site.openingHours.Notes}</div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-lg font-semibold">FAQs</h2>
          <Accordion items={FAQS} />
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-5">
          <div className="text-sm font-semibold">Ready to register?</div>
          <p className="mt-2 text-sm text-gray-600">
            Use the registration button to pick a service and time and complete consent online.
          </p>
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="btn-primary mt-4 w-full rounded-xl px-4 py-3 text-sm font-semibold"
          >
            Vaccine Registration
          </button>
        </section>
      </main>

      <div className="mobile-bar fixed inset-x-0 bottom-0 z-40 md:hidden">
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-2 px-3 py-3">
          <a className="btn-secondary rounded-xl px-3 py-3 text-center text-sm font-semibold" href={`tel:${site.contact.phoneTel}`}>Call</a>
          <a className="btn-secondary rounded-xl px-3 py-3 text-center text-sm font-semibold" href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
          <button type="button" onClick={() => setOpenModal(true)} className="btn-primary rounded-xl px-3 py-3 text-center text-sm font-semibold">Vaccine</button>
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
