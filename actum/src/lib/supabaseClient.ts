import { createClient } from "@supabase/supabase-js";

// Henter Supabase-projektets URL og anonyme nøgle fra miljøvariablerne.
// Miljøvariabler bruges så hemmelige nøgler ikke bliver skrevet direkte i koden og ved et uheld deles offentligt.
// ! fortæller TypeScript at disse værdier altid er til stede – aldrig undefined.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Opretter og eksporterer en Supabase-klient med URL og nøgle.
// Ved at eksportere den herfra kan alle andre filer i projektet importere den samme forbindelse
// i stedet for at oprette en ny forbindelse hver gang.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
