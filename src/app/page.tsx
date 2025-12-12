import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Hero />
      <div id="projects">
        <Projects />
      </div>
      <div id="skills" className="bg-black/[0.96]">
        <Skills />
      </div>
      <div id="contact" className="bg-black/[0.96]">
        <Contact />
      </div>
    </main>
  );
}
