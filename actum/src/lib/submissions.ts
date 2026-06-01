// Definerer hvilke felter kontaktformularen skal indeholde og hvilken type de skal have.
// Bruges til at sikre at de rigtige data bliver sendt med når formularen indsendes.
export type ContactFormData = {
  email: string;
  name: string;
  phone: string;
  message: string;
};

// Sender formularens data og en eventuel fil til vores API-route /api/contact via en POST-anmodning.
// file er optional – formularen fungerer uden vedhæftet fil.
// Promise<void> betyder at funktionen ikke returnerer noget – den sender bare data afsted.
export async function submitContactForm(
  data: ContactFormData,
  file?: File,
): Promise<void> {
  // Browserens native FormData bruges i stedet for JSON, fordi filer ikke kan sendes som JSON.
  // FormData pakker tekst og fil i samme request – browseren sætter selv den rigtige Content-Type.
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("message", data.message);

  // Filen tilføjes kun hvis brugeren har valgt en – feltet er ikke påkrævet.
  if (file) {
    formData.append("file", file);
  }

  // Content-Type sættes ikke manuelt – browseren gør det automatisk
  // og tilføjer en boundary der fortæller serveren hvor hvert felt slutter.
  const response = await fetch("/api/contact", {
    method: "POST",
    body: formData,
  });

  // Hvis serveren svarer med en fejl, kaster vi en fejl som kontaktformularen kan fange og vise til brugeren.
  if (!response.ok) {
    throw new Error("Noget gik galt");
  }
}
