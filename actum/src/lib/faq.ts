// lib/faq.ts
import { supabase } from "@/lib/supabaseClient";

// Definerer typer for FAQ-objekter og deres oversættelser
type FaqTranslations = {
  da: string;
  en: string;
};
// FAQ-objektet indeholder et id, en oprettelsesdato, og oversættelser for både spørgsmål og svar
export type Faq = {
  id: number;
  created_at: string;
  question: FaqTranslations;
  answer: FaqTranslations;
};

// Henter FAQs fra Supabase, sorteret efter oprettelsesdato
export async function getFaqs(limit?: number): Promise<Faq[]> {
  let query = supabase.from("faq").select("*").order("created_at", { ascending: true }); // ascenting: true for at få de ældste FAQs først

  // Hvis der er angivet en limit, tilføjes den til forespørgslen for at begrænse antallet af returnerede FAQs
  if (limit) {
    query = query.limit(limit);
  }

  // Udfører forespørgslen og håndterer eventuelle fejl
  const { data, error } = await query;

  // Hvis der opstår en fejl under hentningen, logges den og en tom array returneres for at undgå nedbrud i applikationen
  if (error) {
    console.error("Fejl ved hentning af FAQs:", error);
    return [];
  }
  // returnerer array af FAQ-objekter, eller en tom array hvis data er null eller undefined
  return data as Faq[];
}
