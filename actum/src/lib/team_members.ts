import { supabase } from "@/lib/supabaseClient";
import { TeamMember } from "@/lib/types";

// Henter alle teammedlemmer fra Supabase-tabellen team_members.
// Promise<TeamMember[]> betyder at funktionen returnerer et array af TeamMember-objekter når den er færdig.
export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    // Specificerer hvilke kolonner vi vil hente – vi henter kun det vi har brug for
    .select("id, name, title, description, image_url, display_order")
    // Sorterer medlemmerne efter display_order så rækkefølgen styres fra databasen
    .order("display_order");

  // Hvis Supabase returnerer en fejl, kastes den videre så siden kan håndtere den
  if (error) throw error;

  // Returnerer data hvis det findes – ellers et tomt array så siden ikke crasher
  return data ?? [];
}
