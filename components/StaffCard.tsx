import Image from "next/image";

type StaffMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  highlights: string[];
  isOwner?: boolean;
  image?: string; // e.g. "/staff/des.jpg"
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

/**
 * Simple deterministic "hash" to pick a pill colour per label.
 * Keeps colours stable across renders without storing extra metadata.
 */
function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function pillClasses(label: string) {
  const palettes = [
    "bg-blue-50 text-blue-800 ring-blue-100",
    "bg-emerald-50 text-emerald-800 ring-emerald-100",
    "bg-violet-50 text-violet-800 ring-violet-100",
    "bg-amber-50 text-amber-900 ring-amber-100",
    "bg-rose-50 text-rose-800 ring-rose-100",
    "bg-cyan-50 text-cyan-800 ring-cyan-100",
  ];
  const idx = hashString(label) % palettes.length;
  return palettes[idx];
}

export default function StaffCard({ person }: { person: StaffMember }) {
  const hasImage = Boolean(person.image);

  return (
    <article
      className="
        group rounded-3xl bg-white shadow-sm ring-1 ring-gray-200
        transition hover:-translate-y-0.5 hover:shadow-md
      "
    >
      {/* Top media */}
      <div className="relative overflow-hidden rounded-3xl">
        {/* Subtle brand accent (very light) */}
        <div className="h-2 bg-gradient-to-r from-[var(--brand-blue)]/30 via-[var(--brand-blue)]/10 to-transparent" />

        <div className="p-5">
          <div className="flex items-center justify-center">
            <div
              className={[
                "relative h-28 w-28 overflow-hidden rounded-2xl bg-gray-50 ring-1",
                person.isOwner ? "ring-[var(--brand-blue)]/25" : "ring-gray-200",
              ].join(" ")}
            >
              {hasImage ? (
                <Image
                  src={person.image!}
                  alt={person.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                  priority={person.isOwner === true}
                />
              ) : (
                <div
                  className={[
                    "flex h-full w-full items-center justify-center text-2xl font-semibold",
                    person.isOwner
                      ? "text-[var(--brand-blue)]"
                      : "text-gray-800",
                  ].join(" ")}
                  aria-hidden
                >
                  {initials(person.name)}
                </div>
              )}
            </div>
          </div>

          {/* Name / role */}
          <div className="mt-4 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <h3 className="text-base font-semibold text-gray-900">
                {person.name}
              </h3>

              {person.isOwner ? (
                <span className="rounded-full bg-[var(--brand-blue)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--brand-blue)]">
                  Owner
                </span>
              ) : null}
            </div>

            <div className="mt-1 text-sm font-semibold text-gray-600">
              {person.role}
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-700">
              {person.bio}
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {person.highlights.map((h) => (
              <span
                key={h}
                className={[
                  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                  "ring-1",
                  pillClasses(h),
                ].join(" ")}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
