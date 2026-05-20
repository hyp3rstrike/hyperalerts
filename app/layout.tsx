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
  metadataBase: new URL("https://hyperx64.com/hyperalerts/"),
  title: "Hyper Alerts",
  description: "Local-first stream alerts for OBS and Streamer.bot.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icons/hyper-alerts-icon.png",
  },
  openGraph: {
    title: "Hyper Alerts",
    description: "Local-first stream alerts for OBS and Streamer.bot.",
    images: ["/icons/hyper-alerts-icon.png"],
  },
  twitter: {
    card: "summary",
    title: "Hyper Alerts",
    description: "Local-first stream alerts for OBS and Streamer.bot.",
    images: ["/icons/hyper-alerts-icon.png"],
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
