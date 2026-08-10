import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "CVento — Créez un CV qui passe les filtres ATS",
  description:
    "CVento génère votre CV et votre lettre de motivation avec l'IA, adaptés au marché français, optimisés pour les logiciels de recrutement (ATS).",
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
      </body>
    </html>
  );
}
