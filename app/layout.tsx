import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const basePath = process.env.GITHUB_ACTIONS === "true" ? "/hyperalerts" : "";
const siteUrl = process.env.GITHUB_ACTIONS === "true" ? "https://hyperx64.com/hyperalerts/" : "http://localhost:3000/";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hyper Alerts",
  description: "Local-first stream alerts for OBS and Streamer.bot.",
  icons: {
    icon: `${basePath}/favicon.ico`,
    shortcut: `${basePath}/favicon.ico`,
    apple: `${basePath}/icons/hyper-alerts-icon.png`,
  },
  openGraph: {
    title: "Hyper Alerts",
    description: "Local-first stream alerts for OBS and Streamer.bot.",
    images: [`${siteUrl}icons/hyper-alerts-icon.png`],
  },
  twitter: {
    card: "summary",
    title: "Hyper Alerts",
    description: "Local-first stream alerts for OBS and Streamer.bot.",
    images: [`${siteUrl}icons/hyper-alerts-icon.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
