import GravityHero from "@/components/GravityHero";
import Projects from "@/components/Projects";
import TechnicalArsenal from "@/components/TechnicalArsenal";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen antialiased">
      <GravityHero />
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
    </main>
  );
}
