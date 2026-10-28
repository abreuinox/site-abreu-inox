import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { GoogleTag } from "@/components/GoogleTag";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { siteGraph } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Códigos de verificação do Search Console e do Bing, definidos na Vercel.
// A verificação por DNS (registro TXT) dispensa estas variáveis.
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s | ${site.shortName}` },
  description: site.seo.description,
  applicationName: site.shortName,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: site.shortName,
    title: site.seo.title,
    description: site.seo.description,
    locale: site.locale,
    images: [{ ...site.ogImage, url: absoluteUrl(site.ogImage.url) }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  formatDetection: { telephone: false },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${archivo.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-full bg-paper px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <JsonLd data={siteGraph()} />
        <Analytics />
        <GoogleTag />
      </body>
    </html>
  );
}
