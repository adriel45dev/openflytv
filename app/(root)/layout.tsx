import type { Metadata } from "next";
import { Inter, Comfortaa } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });
const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenFlyTV",
  description: "Watch free channels around the world",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/android-chrome-192x192.png?v=3",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      url: "/android-chrome-512x512.png?v=3",
    },
    {
      rel: "shortcut icon",
      type: "image/x-icon",
      sizes: "512x512",
      url: "/logo_png_512x512.png?v=3",
    },
    {
      rel: "shortcut icon",
      type: "image/x-icon",
      url: "/myIcon.ico?v=3",
    },
    {
      rel: "icon",
      type: "image/ico",
      url: "/favicon.ico?v=3",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/android-chrome-192x192.png?v=3",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      url: "/android-chrome-512x512.png?v=3",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      url: "/apple-touch-icon.png?v=3",
    },

    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png?v=3",
    },

    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png?v=3",
    },

    {
      rel: "icon",
      type: "image/svg",
      url: "/logo.svg?v=3",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${comfortaa.className} min-h-screen bg-slate-900`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
