// Product beskriver strukturen på et produkt hentet fra databasen.
// Navn, beskrivelse og kategori findes på både dansk og engelsk så de kan vises på det rigtige sprog.
export type Product = {
  id: number;
  // Bruges til at sortere produkterne i en bestemt rækkefølge
  sort_by: number;
  name: {
    da: string;
    en: string;
  };
  description: {
    da: string;
    en: string;
  };
  category: {
    da: string;
    en: string;
  };
  // Et produkt kan have flere billeder – eller ingen, deraf null
  pics: string[] | null;
  // Redaktionel tekst der vises i stedet for et billede hvis produktet ikke har nogen billeder
  editorial_text: string | null;
  // Bruges til at fremhæve populære produkter på forsiden
  is_popular: boolean;
  // Tidspunkt for hvornår produktet blev oprettet i databasen
  created_at: string;
};

// Material beskriver strukturen på et materiale der bruges i prisberegneren.
// Navn og kategori findes på både dansk og engelsk.
export type Material = {
  id: string;
  // Prisen per enhed – bruges til at udregne den samlede pris i prisberegneren
  price_per_unit: number;
  category: {
    da: string;
    en: string;
  };
  name: {
    da: string;
    en: string;
  };
};

// Case beskriver strukturen på en case der vises i case-sektionen.
export type Case = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  // Bruges til at styre om billedet vises i stående eller liggende format
  orientation: string;
  // Bruges til at sortere cases i en bestemt rækkefølge
  order: number;
};

// TeamMember beskriver strukturen på et teammedlem der vises i teamsektionen på about-siden.
// Titel og beskrivelse findes på både dansk og engelsk.
export type TeamMember = {
  id: string;
  name: string;
  title: {
    da: string;
    en: string;
  };
  description: {
    da: string;
    en: string;
  };
  image_url: string;
  // Bruges til at styre hvilken rækkefølge teammedlemmerne vises i
  display_order: number;
};

// ContactFormData beskriver strukturen på de data der sendes når kontaktformularen indsendes.
// Bruges til at sikre at de rigtige felter altid er til stede når formularen sendes til API-routen.
export type ContactFormData = {
  email: string;
  name: string;
  phone: string;
  message: string;
};
