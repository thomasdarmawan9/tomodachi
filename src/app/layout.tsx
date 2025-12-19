import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LearningProvider } from "@/lib/learning-context";
import { AuthProvider } from "@/lib/auth-context";
import { StoreProvider } from "@/lib/store/StoreProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Tomodachi | Japanese Learning",
  description: "Belajar bahasa Jepang untuk Beginner & N5 dengan jalur terstruktur.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  applicationName: "Tomodachi",
  keywords: [
    "belajar bahasa jepang",
    "kursus bahasa jepang online",
    "hiragana",
    "katakana",
    "jlpt n5",
    "jlpt n4",
    "srs flashcard",
    "kosakata jepang",
    "belajar kanji",
    "latihan grammar jepang"
  ],
  authors: [{ name: "Tomodachi" }],
  creator: "Tomodachi",
  publisher: "Tomodachi",
  category: "education",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Tomodachi | Japanese Learning",
    description: "Belajar bahasa Jepang untuk Beginner & N5 dengan jalur terstruktur.",
    url: "/",
    siteName: "Tomodachi",
    locale: "id_ID",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomodachi | Japanese Learning",
    description: "Belajar bahasa Jepang untuk Beginner & N5 dengan jalur terstruktur."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.variable} bg-slate-50 text-slate-900`}>
        <StoreProvider>
          <LearningProvider>
            <AuthProvider>{children}</AuthProvider>
          </LearningProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
