import type { Metadata } from "next";
import { Geist, Geist_Mono, Ubuntu, Michroma } from "next/font/google";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import QueryProvider from "./providers/QueryProvider";
import "./globals.css";

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-michroma",
  display: "swap",
});

const ubuntu = Ubuntu({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-ubuntu",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://itealab.org",
  ),
  title: "ITeaLab - Innovation through Technology and Education",
  description:
    "We are a forward-thinking laboratory focused on advancing technology and education through innovative research and collaborative projects.",
  openGraph: {
    title: "ITeaLab - Innovation through Technology and Education",
    description:
      "We are a forward-thinking laboratory focused on advancing technology and education through innovative research and collaborative projects.",
    url: "https://itealab.org",
    siteName: "ITeaLab",
    images: [
      {
        url: "https://res.cloudinary.com/dndgcwunv/image/upload/v1791471683/landingpage_qqam1l.png",
        width: 1200,
        height: 630,
        alt: "ITeaLab - Innovation through Technology and Education",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ITeaLab - Innovation through Technology and Education",
    description:
      "We are a forward-thinking laboratory focused on advancing technology and education through innovative research and collaborative projects.",
    images: [
      "https://res.cloudinary.com/dndgcwunv/image/upload/v1791471683/landingpage_qqam1l.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/images/icon_transparent.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/images/iot.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ubuntu.variable} ${michroma.variable} antialiased`}
      >
        <QueryProvider>
          <LanguageProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
