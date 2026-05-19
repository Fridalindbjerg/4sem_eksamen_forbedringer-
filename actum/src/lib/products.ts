import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/lib/types";

// bruges i produktgrid på index
export async function getPopularProducts(): Promise<Product[]> { // Returnerer en promise der løser til en array af Product-objekter
  const { data, error } = await supabase
    .from("products") // Vælger data fra "products" tabellen
    .select("id, name, description, pics, editorial_text, sort_by, category") // Vælger specifikke kolonner for at optimere forespørgslen
    .eq("is_popular", true) // Filtrerer produkter, der er markeret som populære
    .order("sort_by"); // Sorterer resultaterne efter "sort_by" kolonnen for at sikre en bestemt rækkefølge

  if (error) throw error;
  return (data as Product[]) ?? []; // Returnerer data hvis det findes, ellers en tom array
}

// bruges i single product page
export async function getRelatedProducts(
  currentId: number,
  category: { da: string; en: string },
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, pics, sort_by, category")
    .eq("category->>da", category.da)
    .neq("id", currentId)
    .order("sort_by");

  if (error) throw error;
  return (data as Product[]) ?? []; // Returnerer data hvis det findes, ellers en tom array
}

// bruges i single product page
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, pics, editorial_text, sort_by, category")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as Product;
}

// bruges i products/page.tsx
export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, pics, editorial_text, sort_by, category")
    .order("sort_by");

  if (error) throw error;
  return (data as Product[]) ?? [];
}
