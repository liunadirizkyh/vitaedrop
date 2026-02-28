import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VitaeDrop — CV Generator Modern & Professional",
  description:
    "VitaeDrop adalah CV generator modern yang membantu Anda membuat CV profesional dengan cepat, mudah, dan tanpa ribet. Tinggal masukkan data, CV siap digunakan.",
  keywords: [
    "VitaeDrop",
    "CV Generator",
    "Resume Builder",
    "Buat CV Online",
    "CV Professional",
    "Resume Generator",
    "CV ATS Friendly",
  ],
  authors: [{ name: "VitaeDrop" }],
  creator: "VitaeDrop",
  applicationName: "VitaeDrop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
