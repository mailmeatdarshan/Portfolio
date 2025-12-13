import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechnicalArsenal from "@/components/TechnicalArsenal";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Hero />
      <div id="about" className="bg-black/[0.96]">
        <About />
      </div>
      <div id="experience" className="bg-black/[0.96]">
        <Experience />
      </div>
      <div id="skills" className="bg-black/[0.96]">
        <TechnicalArsenal />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact" className="bg-black/[0.96]">
        <Contact />
      </div>
    </main>
  );
}
