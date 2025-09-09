

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book App",
  description: "A modern app to explore, read, and manage books.",
  keywords: ["books", "library", "reading", "bookstore"],
  authors: [{ name: "Gobinda" }],
  icons: {
    icon: "/favicon.svg",           
    shortcut: "/icon.png",         
    apple: "/apple-icon.png",       
  },
  openGraph: {
    title: "Book App",
    description: "Discover and manage your favorite books online.",
    url: "https://yourdomain.com",
    siteName: "Book App",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
