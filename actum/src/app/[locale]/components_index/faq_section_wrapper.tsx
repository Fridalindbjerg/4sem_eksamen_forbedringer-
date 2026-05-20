// faq_section_wrapper.tsx
import { getFaqs } from "@/lib/faq";
import FaqSection from "./faq_section";

{/* 4 er antallet af FAQ fra database, der skal hentes for denne sektion*/ }
const faqs = await getFaqs(4);
export default async function FaqSectionWrapper() {
  return (
    // FaqSectionWrapper er en wrapper-komponent, der håndterer data-fetching for FAQ-sektionen. */ }
    // FaqSection er et use client komponent og kan derfor ikke hente data selv. Derfor ligger den i en komponent for sig, hvor data hentes asynkront, og suspense kan bruges på index page omkring denne komponent.
    <section className="section content">
      <FaqSection faqs={faqs} />
    </section>
  );
} 
