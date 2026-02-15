"use client";

import { useState } from "react";
import site from "../content/site.json";
import Header from "./Header";
import Footer from "./Footer";
import VaccineRegistrationModal from "./VaccineRegistrationModal";

type NavItem = { href: string; label: string };

export default function SiteShell({
  nav,
  topContent,
  children,
}: {
  nav: NavItem[];
  topContent?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Header nav={nav} onVaccineClick={() => setOpenModal(true)} />
      {topContent}
      {children}
      <Footer />
      <VaccineRegistrationModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        bookingUrl={site.integrations.epharmacyBookingUrl}
      />
    </>
  );
}
