import { supabase } from "@/lib/supabaseClient";
import { Case } from "@/lib/types";

// Henter alle cases fra Supabase sorteret efter order
export async function getCases(): Promise<Case[]> { // Returnerer en promise der løser til en array af Case-objekter
  const { data, error } = await supabase
    .from("cases") // Vælger data fra "cases" tabellen
    .select("*") // Vælger alle kolonner
    .order("order", { ascending: true }); // Sorterer resultaterne efter "order" kolonnen i stigende rækkefølge

  if (error) {
    console.error("Fejl ved hentning af cases:", error);
    return []; // Returnerer en tom array ved fejl for at undgå nedbrud i applikationen
  }

  return data ?? []; // Returnerer data hvis det findes, ellers en tom array
}
