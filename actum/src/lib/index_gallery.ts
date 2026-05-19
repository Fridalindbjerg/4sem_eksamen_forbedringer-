import { supabase } from "@/lib/supabaseClient";

// Henter offentlige URL'er for billeder i "faq-gallery" storage bucket
export async function getIndexImages(): Promise<string[]> { // promise der løser til en array af strings (URL'er)
  const { data, error } = await supabase.storage.from("index").list(); // henter listen af filer i "index" storage bucket

  if (error) {
    console.error("Fejl ved hentning af billeder:", error);
    return []; // Error besked, hvis henting af billeder fejler - returnere tom array
  }

  // Filtrerer eventuelle placeholder-filer ud og returnerer en array af offentlige URL'er for de resterende billeder
  return data
    .filter((file) => file.name !== ".emptyFolderPlaceholder")
    .map((file) => supabase.storage.from("index").getPublicUrl(file.name).data.publicUrl);
}