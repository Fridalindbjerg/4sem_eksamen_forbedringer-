import { supabase } from "@/lib/supabaseClient";

// Henter offentlige URL'er for billeder i "faq-gallery" storage bucket
export async function getFaqImages(): Promise<string[]> {
  const { data, error } = await supabase.storage.from("faq-gallery")
    .list()

  // Error besked, hvis henting af billeder fejler - returnere tom array
  if (error) {
    console.error("Fejl ved hentning af billeder:", error);
    return [];
  }

  // Filtrerer eventuelle placeholder-filer ud og returnerer en array af offentlige URL'er for de resterende billeder
  return data.filter((file) => file.name !== ".emptyFolderPlaceholder").map((file) => supabase.storage.from("faq-gallery").getPublicUrl(file.name).data.publicUrl);
}
