import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter } from "next/font/google";
import { CookieNotice } from "@/components/CookieNotice";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TITLE = "CVento — Créez un CV qui passe les filtres ATS";
const DESCRIPTION =
  "CVento génère votre CV et votre lettre de motivation avec l'IA, adaptés au marché français, optimisés pour les logiciels de recrutement (ATS).";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cvento.fr"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.cvento.fr",
    siteName: "CVento",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        {children}
        <CookieNotice />
        <Script
          data-goatcounter="https://cvento.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
