import { supabase } from "@/lib/supabaseClient";
import { Material } from "./types";

// Henter alle materialer fra Supabase
export async function getMaterials(): Promise<Material[]> {
  const { data } = await supabase
    .from("materials") // Vælger data fra "materials" tabellen
    .select("id, name, price_per_unit, category"); // Vælger specifikke kolonner for at optimere forespørgslen
  return data ?? []; // Returnerer data hvis det findes, ellers en tom array
}
