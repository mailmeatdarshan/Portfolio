import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";
import "./clippy-overrides.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import ClippyAssistant from "@/components/ClippyAssistant";
import Starfield from "@/components/ui/Starfield";
import { SmoothScroll } from "@/components/SmoothScroll";
import SplashScreen from "@/components/ui/SplashScreen";
import DotNav from "@/components/ui/dot-nav";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Darshan Dubey | Full Stack Developer",
  description: "Explore the portfolio of Darshan Dubey, a passionate Full Stack Developer specializing in modern web technologies. Experience premium designs and interactive digital solutions.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${orbitron.variable} antialiased font-sans bg-black/[0.96]`}
        suppressHydrationWarning
      >
        <SplashScreen />
        <SmoothScroll>
          <Starfield />
          <DotNav />
          <Navbar />
          {children}
          <BackToTop />
          <ClippyAssistant />
        </SmoothScroll>
      </body>
    </html>
  );
}
