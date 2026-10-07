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
  title: "ITeaLab - Innovation through Technology and Education",
  description:
    "We are a forward-thinking laboratory focused on advancing technology and education through innovative research and collaborative projects.",
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
