import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LearningProvider } from "@/lib/learning-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Tomodachi | Japanese Learning",
  description: "Belajar bahasa Jepang untuk Beginner & N5 dengan jalur terstruktur."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-slate-50 text-slate-900`}>
        <LearningProvider>{children}</LearningProvider>
      </body>
    </html>
  );
}
