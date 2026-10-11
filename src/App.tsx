import { lazy, Suspense } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
const About = lazy(() => import("./components/About").then((m) => ({ default: m.About })));
const Projects = lazy(() => import("./components/Projects").then((m) => ({ default: m.Projects })));
const Experience = lazy(() => import("./components/Experience").then((m) => ({ default: m.Experience })));
const Skills = lazy(() => import("./components/Skills").then((m) => ({ default: m.Skills })));
const Achievements = lazy(() => import("./components/Achievements").then((m) => ({ default: m.Achievements })));
const Journey = lazy(() => import("./components/Journey").then((m) => ({ default: m.Journey })));
const Contact = lazy(() => import("./components/Contact").then((m) => ({ default: m.Contact })));

import { Footer } from "./components/Footer";
import { Cursor } from "./components/Cursor";

export default function App() {
  return (
    <div className="noise relative min-h-screen bg-background text-foreground dark">
      <Cursor />
      <Navigation />
      <main>
        <Hero />
        <Suspense fallback={<div className="py-24" />}>
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Achievements />
          <Journey />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
