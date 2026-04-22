import GravityHero from "@/components/GravityHero";
import Projects from "@/components/Projects";
import TechnicalArsenal from "@/components/TechnicalArsenal";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen antialiased">
      <div id="home">
        <GravityHero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="skills">
        <TechnicalArsenal />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <div className="flex justify-center pb-20">
        <Link 
          href="/about" 
          className="text-lg font-medium hover:underline transition-all duration-300 opacity-60 hover:opacity-100"
          style={{ color: "var(--theme-text-body)" }}
        >
          Explore more →
        </Link>
      </div>
    </main>
  );
}
