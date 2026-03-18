import Hero from "./Hero";
import About from "./About";
import Certifications from "./Certifications";
import Projects from "./Projects";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home({ isDark, onViewAll }) {
  return (
    <>
      <main>
        <Hero isDark={isDark} />
        <About isDark={isDark} />
        <Certifications isDark={isDark} />
        <Projects isDark={isDark} onViewAll={onViewAll} />
        <Education isDark={isDark} />
        <Contact isDark={isDark} />
      </main>

      <Footer isDark={isDark} />
    </>
  );
}