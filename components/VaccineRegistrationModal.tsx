"use client";

import { useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl: string;
};

export default function VaccineRegistrationModal({ isOpen, onClose, bookingUrl }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    // Focus close button for accessibility
    setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Vaccine Registration"
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative mx-auto mt-3 w-[94vw] max-w-4xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="text-sm font-semibold">Vaccine Registration</div>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Close
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-3">
            <div className="mb-3 text-sm text-gray-600">
              If the booking screen doesn’t load,{" "}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                open it in a new tab
              </a>
              .
            </div>

            <div className="h-[82vh] w-full overflow-hidden rounded-xl border">
              <iframe
                title="ePharmacy Booking"
                src={bookingUrl}
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
