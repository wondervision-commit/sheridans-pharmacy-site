import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export default function PageHero({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-gray-600">{subtitle}</p>
      {children}
    </section>
  );
}
