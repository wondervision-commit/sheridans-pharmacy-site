type Props = {
  embedUrl: string;
  className?: string;
};

export default function MapSection({ embedUrl, className = "" }: Props) {
  return (
    <section
      className={["overflow-hidden rounded-2xl border bg-white", className].join(
        " "
      )}
    >
      <iframe title="Map" src={embedUrl} className="h-72 w-full" loading="lazy" />
    </section>
  );
}
