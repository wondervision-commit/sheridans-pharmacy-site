"use client";

import QuickActions from "./QuickActions";
import { trackEvent } from "../lib/gtag";

type Props = {
  onVaccineClick: () => void;
};

export default function MobileActionBar({ onVaccineClick }: Props) {
  return (
    <div className="mobile-bar fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="mx-auto max-w-5xl px-3 py-3">
        <div className="grid grid-cols-3 gap-2">
          <QuickActions mode="bar" className="col-span-2" />
          <button
            type="button"
            onClick={() => {
              trackEvent("vaccine_registration_click", {
                source: "mobile_action_bar",
              });
              onVaccineClick();
            }}
            className="btn-primary rounded-xl px-3 py-3 text-center text-sm font-semibold"
          >
            Vaccine
          </button>
        </div>
      </div>
    </div>
  );
}
