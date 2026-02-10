type SocialIconProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

export default function SocialIcon({ href, label, children }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="
        flex h-12 w-12 items-center justify-center
        rounded-full border border-current
        transition
        hover:bg-current hover:text-[var(--brand-blue)]
        text-white
      "
    >
      {children}
    </a>
  );
}
