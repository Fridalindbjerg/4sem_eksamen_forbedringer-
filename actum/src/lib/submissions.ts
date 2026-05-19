// Definerer hvilke felter kontaktformularen skal indeholde og hvilken type de skal have.
// Bruges til at sikre at de rigtige data bliver sendt med når formularen indsendes.
export type ContactFormData = {
  email: string;
  name: string;
  phone: string;
  message: string;
};

// Sender formularens data til vores API-route /api/contact via en POST-anmodning.
// Promise<void> betyder at funktionen ikke returnerer noget – den sender bare data afsted.
export async function submitContactForm(data: ContactFormData): Promise<void> {
  // fetch sender en HTTP-anmodning til vores API-route.
  // method: "POST" fortæller at vi sender data – ikke henter det.
  // headers fortæller serveren at vi sender JSON.
  // JSON.stringify konverterer data-objektet til en JSON-streng så det kan sendes over netværket.
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // Hvis serveren svarer med en fejl, kaster vi en fejl som kontaktformularen kan fange og vise til brugeren
  if (!response.ok) {
    throw new Error("Noget gik galt");
  }
}
