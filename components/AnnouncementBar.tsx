import announcement from "../content/announcement.json";

export default function AnnouncementBar() {
  const message = (announcement.message ?? "").trim();
  if (!message) return null;

  return (
    <section
      role="status"
      aria-live="polite"
      className="border-y border-amber-300 bg-amber-100 text-amber-950"
    >
      <div className="mx-auto flex max-w-5xl items-start gap-3 px-4 py-3">
        <svg
          viewBox="0 0 24 24"
          className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M12 2 1.8 20.5h20.4L12 2Zm0 5.5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm0 10a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z"
          />
        </svg>
        <p className="text-sm font-medium leading-6">{message}</p>
      </div>
    </section>
  );
}
