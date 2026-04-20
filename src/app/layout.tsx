import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Orbitron, Permanent_Marker } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./clippy-overrides.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import ClippyAssistant from "@/components/ClippyAssistant";
import { SmoothScroll } from "@/components/SmoothScroll";
import SplashScreen from "@/components/ui/SplashScreen";
import DotNav from "@/components/ui/dot-nav";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import Atmosphere from "@/components/ui/Atmosphere";
import ModeToggle from "@/components/ui/ModeToggle";
import ZenMode from "@/components/ui/ZenMode";
import ZenTransition from "@/components/ui/ZenTransition";
import TerminalMode from "@/components/ui/TerminalMode";

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

const permanentMarker = Permanent_Marker({
  variable: "--font-handwriting",
  weight: "400",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
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
        className={`${outfit.variable} ${spaceGrotesk.variable} ${orbitron.variable} ${satoshi.variable} ${permanentMarker.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SplashScreen />
          <SmoothScroll>
            <Atmosphere />
            <ZenMode />
            <ZenTransition />
            <TerminalMode />
            <DotNav />
            <Navbar />
            {children}
            <ModeToggle />
            <BackToTop />
            <ClippyAssistant />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
