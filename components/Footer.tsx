import Link from "next/link";
import site from "../content/site.json";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-[var(--brand-blue)] text-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Business */}
          <div>
            <div className="text-sm font-semibold">{site.businessName}</div>
            <div className="mt-2 text-sm/6 opacity-90">
              <div>{site.address.line2}</div>
              <div>{site.address.cityRegion}</div>
              <div>{site.address.country}</div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-2 space-y-2 text-sm opacity-90">
              <div>
                Phone:{" "}
                <a className="underline" href={`tel:${site.contact.phoneTel}`}>
                  {site.contact.phoneDisplay}
                </a>
              </div>
              <div>
                Email:{" "}
                <a className="underline" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </div>
              <div className="text-xs opacity-90">
                WhatsApp: {site.contact.whatsappDisplay}
              </div>
              <div className="text-xs opacity-90">
                Fax: {site.contact.faxDisplay}
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-sm font-semibold">Quick links</div>
            <div className="mt-2 grid gap-2 text-sm opacity-90">
              <Link className="underline" href="/vaccines">
                Vaccines
              </Link>
              <Link className="underline" href="/downloads">
                Downloads
              </Link>
              <Link className="underline" href="/contact">
                Contact
              </Link>
            </div>

            {/* Social icons */}
            <div className="mt-4">
              <div className="text-sm font-semibold">Social</div>
              <div className="mt-3">
                <SocialLinks variant="dark" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-xs opacity-80">
          © {year} {site.businessName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
