import GravityHero from "@/components/GravityHero";
import Projects from "@/components/Projects";
import TechnicalArsenal from "@/components/TechnicalArsenal";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Link from "next/link";
import { BlurReveal } from "@/components/BlurReveal";

export default function Home() {
  return (
    <main className="min-h-screen antialiased">
      <BlurReveal>
        <div id="home">
          <GravityHero />
        </div>
      </BlurReveal>
      <BlurReveal>
        <div id="about">
          <About />
        </div>
      </BlurReveal>
      <BlurReveal>
        <div id="experience">
          <Experience />
        </div>
      </BlurReveal>
      <BlurReveal>
        <div id="skills">
          <TechnicalArsenal />
        </div>
      </BlurReveal>
      <BlurReveal>
        <div id="projects">
          <Projects />
        </div>
      </BlurReveal>
      <BlurReveal>
        <div id="contact">
          <Contact />
        </div>
      </BlurReveal>
    </main>
  );
}
