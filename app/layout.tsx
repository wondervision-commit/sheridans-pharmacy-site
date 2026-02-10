import "./globals.css";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Sheridan's Pharmacy — Dublin 15",
  description: "Local pharmacy in Roselawn Shopping Centre, Dublin 15.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/vaccines", label: "Vaccines" },
    { href: "/downloads", label: "Downloads" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Header nav={nav} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
