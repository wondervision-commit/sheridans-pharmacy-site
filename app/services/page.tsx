import Link from "next/link";
import services from "../../content/services.json";
import QuickActions from "../../components/QuickActions";

type ServiceItem = {
  id: string;
  name: string;
  price: string;
};

export default function ServicesPage() {
  const data = services as {
    title: string;
    subtitle: string;
    intro: string;
    note: string;
    items: ServiceItem[];
  };

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
      {/* Header */}
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Services</h1>
        <p className="mt-2 text-gray-600">
          Professional services and pricing at {data.subtitle}.
        </p>

        <div className="mt-4 text-sm text-gray-700">
          <p>{data.intro}</p>
        </div>

        <div className="mt-5">
          <QuickActions className="" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href="/vaccines"
            className="btn-primary rounded-xl px-3 py-3 text-center text-sm font-semibold"
          >
            Vaccine Registration
          </Link>
          <Link
            href="/contact"
            className="btn-secondary rounded-xl px-3 py-3 text-center text-sm font-semibold"
          >
            Contact
          </Link>
        </div>
      </section>

      {/* Pricing list */}
      <section className="mt-6 rounded-2xl border bg-white p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{data.title}</h2>
            <p className="mt-1 text-sm text-gray-600">
              Prices shown are indicative. “NA” means ask in store.
            </p>
          </div>
          <Link className="text-sm font-semibold underline" href="/downloads">
            Downloads
          </Link>
        </div>

        <div className="mt-5 space-y-2">
          {data.items.map((item) => {
            const isNA = item.price.trim().toUpperCase() === "NA";

            return (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 rounded-2xl border bg-white px-4 py-4"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </div>
                </div>

                <div className="shrink-0">
                  {isNA ? (
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                      Ask in store
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-[var(--brand-blue)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-blue)]">
                      {item.price}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-xl bg-gray-50 p-4 text-xs text-gray-600">
          {data.note}
        </div>
      </section>
    </main>
  );
}
