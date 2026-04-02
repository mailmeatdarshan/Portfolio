import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./clippy-overrides.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import ClippyAssistant from "@/components/ClippyAssistant";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Darshan Dubey | Full Stack Developer",
  description: "Portfolio of Darshan Dubey - Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <BackToTop />
        <ClippyAssistant />
      </body>
    </html>
  );
}
