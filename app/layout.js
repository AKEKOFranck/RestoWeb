import { Playfair_Display, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import { site } from "@/data/site";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.tagline}`, template: `%s – ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: site.name,
    title: `${site.name} – ${site.tagline}`,
    description: site.description,
  },
};

export const viewport = { themeColor: "#fbf3e4" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable} ${caveat.variable}`}>
      <body>
        <a href="#contenu" className="skipLink">Aller au contenu</a>
        <Navbar />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
