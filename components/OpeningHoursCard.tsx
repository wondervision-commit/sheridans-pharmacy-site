"use client";

import site from "../content/site.json";

type OpeningHoursShape = Record<string, string | undefined> & {
  notes?: string;
  Notes?: string;
};

function getHoursValue(hours: OpeningHoursShape, key: string) {
  // supports either lowercase keys (mon) or uppercase (Mon)
  return (hours as any)[key] ?? (hours as any)[key.toLowerCase()] ?? (hours as any)[key[0].toUpperCase() + key.slice(1)];
}

function normalizeRange(range: string) {
  // Handles “09:00–19:00” (en dash) and “09:00-19:00” (hyphen)
  const r = range.replace(/\s+/g, "");
  const parts = r.split("–").length === 2 ? r.split("–") : r.split("-");
  if (parts.length !== 2) return null;

  const [start, end] = parts;
  // basic validation
  if (!/^\d{2}:\d{2}$/.test(start) || !/^\d{2}:\d{2}$/.test(end)) return null;
  return { start, end };
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10));
  return h * 60 + m;
}

function isOpenNow(range: string, now: Date) {
  const normalized = normalizeRange(range);
  if (!normalized) return null;

  const mins = now.getHours() * 60 + now.getMinutes();
  const start = toMinutes(normalized.start);
  const end = toMinutes(normalized.end);

  // Assumes same-day opening (no overnight)
  return mins >= start && mins < end;
}

const DAYS: { key: string; label: string }[] = [
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
];

function todayKeyLocal(now: Date) {
  // JS: 0=Sun, 1=Mon...
  const idx = now.getDay();
  return idx === 0 ? "sun" : ["mon", "tue", "wed", "thu", "fri", "sat"][idx - 1];
}

export default function OpeningHoursCard({
  title = "Opening Hours",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  const hours = site.openingHours as OpeningHoursShape;

  // Use local time (Ireland in your case). If server timezone differs, this component is client-side.
  const now = new Date();
  const today = todayKeyLocal(now);

  const todayValue = getHoursValue(hours, today) ?? "—";
  const openState =
    typeof todayValue === "string" && todayValue.toLowerCase() !== "closed"
      ? isOpenNow(todayValue, now)
      : false;

  const status =
    openState === null
      ? null
      : openState
      ? { text: "Open now", pill: "bg-emerald-50 text-emerald-800 ring-emerald-100" }
      : { text: "Closed now", pill: "bg-rose-50 text-rose-800 ring-rose-100" };

  const notes = (hours.notes ?? hours.Notes)?.trim();

  return (
    <section
      className={[
        "rounded-2xl border bg-white p-5",
        "shadow-sm",
        className,
      ].join(" ")}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-gray-900">{title}</div>
          <div className="mt-1 text-sm text-gray-600">
            {site.address.line2}, {site.address.cityRegion}
          </div>
        </div>

        {status ? (
          <span
            className={[
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
              status.pill,
            ].join(" ")}
          >
            {status.text}
          </span>
        ) : null}
      </div>

      {/* Subtle brand accent */}
      <div className="mt-4 h-1 w-full rounded-full bg-gradient-to-r from-[var(--brand-blue)]/35 via-[var(--brand-blue)]/12 to-transparent" />

      {/* Hours list */}
      <div className="mt-4 rounded-2xl bg-gray-50 p-4">
        <div className="grid gap-2">
          {DAYS.map((d) => {
            const value = getHoursValue(hours, d.key) ?? "—";
            const isToday = d.key === today;

            return (
              <div
                key={d.key}
                className={[
                  "flex items-center justify-between gap-3 rounded-xl px-3 py-2",
                  isToday ? "bg-white ring-1 ring-[var(--brand-blue)]/20" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={[
                      "text-sm font-semibold",
                      isToday ? "text-gray-900" : "text-gray-800",
                    ].join(" ")}
                  >
                    {d.label}
                  </div>
                  {isToday ? (
                    <span className="rounded-full bg-[var(--brand-blue)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--brand-blue)]">
                      Today
                    </span>
                  ) : null}
                </div>

                <div
                  className={[
                    "text-sm",
                    value.toLowerCase() === "closed"
                      ? "font-semibold text-gray-500"
                      : "font-semibold text-gray-900",
                  ].join(" ")}
                >
                  {value}
                </div>
              </div>
            );
          })}
        </div>

        {notes ? (
          <div className="mt-3 text-xs text-gray-600">{notes}</div>
        ) : null}
      </div>
    </section>
  );
}
