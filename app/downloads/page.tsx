import downloads from "../../content/downloads.json";

type DownloadItem = {
  title: string;
  type: string;
  url: string;
};

type DownloadCategory = {
  name: string;
  items: DownloadItem[];
};

export default function DownloadsPage() {
  const data = downloads as { categories: DownloadCategory[] };

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Downloads</h1>
        <p className="mt-2 text-gray-600">
          Vaccine information and consent forms available as PDFs.
        </p>
      </section>

      <div className="mt-6 space-y-8">
        {data.categories.map((category) => (
          <section key={category.name}>
            <h2 className="mb-3 text-lg font-semibold">{category.name}</h2>

            <div className="space-y-2">
              {category.items.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border bg-white px-4 py-4 hover:bg-gray-50"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">
                      {item.title}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      PDF • opens in new tab
                    </div>
                  </div>

                  <div className="btn-secondary ml-4 shrink-0 rounded-xl px-3 py-2 text-xs font-semibold">
                    Open
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
