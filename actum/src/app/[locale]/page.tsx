import { Suspense } from "react";
import IndexContent from "./components_index/index_content";
import Hero from "./components_index/hero_section";
import AboutSection from "./components_index/about_section";
import VideoSection from "./components_index/video_section";
import FaqSectionWrapper from "./components_index/faq_section_wrapper";

export default function Home() {
  return (
    // suspense omkring produkter og Faq, da de begge henter data asynkront. Resten af siden er statisk og loades derfor med det samme. 
    <main className="full-bleed grid grid-cols-subgrid">
      <Hero />
      <Suspense fallback={<p>Loading Products...</p>}>
        <IndexContent />
      </Suspense>
      <VideoSection />
      <AboutSection />
      <Suspense fallback={<p>Loading FAQ's...</p>}>
        <FaqSectionWrapper />
      </Suspense>
    </main>
  );
}