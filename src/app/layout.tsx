import type { Metadata, Viewport } from "next";
import { Archivo, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* Type system:
   Archivo (variable, wdth axis)  → expanded-width display headings
   Manrope (variable)             → body / descriptions
   JetBrains Mono (variable)      → HUD, telemetry, labels               */

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PELAGIC | Deep-Sea Expedition Systems",
  description:
    "Pelagic builds the vessels, instruments, and expeditions that reveal the 80% of the ocean no human has ever seen. Begin the descent.",
  keywords: ["deep sea", "expedition", "submersible", "ocean exploration"],
};

export const viewport: Viewport = {
  themeColor: "#04090F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${manrope.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
