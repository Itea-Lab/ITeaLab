import type { Metadata } from "next";
import { Geist, Geist_Mono, Ubuntu, Michroma } from "next/font/google";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./globals.css";

const michroma = Michroma({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-michroma',
})

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-ubuntu',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ITeaLab - Innovation through Technology and Education",
  description: "We are a forward-thinking laboratory focused on advancing technology and education through innovative research and collaborative projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ubuntu.variable} ${michroma.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}