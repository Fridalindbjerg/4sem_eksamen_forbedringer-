import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextResponse } from "next/server";

// Opretter forbindelse til Supabase med URL og anonym nøgle fra miljøvariablerne.
// ! fortæller TypeScript at disse værdier altid er til stede – aldrig undefined.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// POST er en Next.js route handler – den kører når kontaktformularen sendes.
// Den modtager en request med brugerens data og håndterer tre ting:
// 1. Uploader en eventuel fil til Supabase Storage og henter en signeret URL
// 2. Gemmer henvendelsen i Supabase så den ikke går tabt
// 3. Sender en e-mail til Actum så de bliver notificeret med det samme
export async function POST(request: Request) {
  // Resend-klienten oprettes inde i handler-funktionen og ikke på modul-niveau.
  // Det sikrer at API-nøglen først læses når ruten kaldes – ikke under Next.js build.
  const resend = new Resend(process.env.RESEND_API_KEY);

  // FormData læses i stedet for .json() fordi requesten nu kan indeholde en fil.
  // Browserens FormData pakker tekst og fil i samme request.
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  // Filen er optional – hvis brugeren ikke har vedhæftet noget, er værdien null.
  const file = formData.get("file") as File | null;

  // fileUrl gemmes her hvis en fil uploades – ellers forbliver den null
  // og udelades fra både databaserækken og e-mailen.
  let fileUrl: string | null = null;

  if (file && file.size > 0) {
    // Konverterer filen til en buffer som Supabase Storage forventer.
    const buffer = Buffer.from(await file.arrayBuffer());

    // Unikt filnavn baseret på tidsstempel – undgår navnekollisioner i bucketen.
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
    const fileName = `${Date.now()}-${sanitizedName}`;

    const { error: uploadError } = await supabase.storage
      .from("contact-files")
      .upload(fileName, buffer, {
        contentType: file.type,
      });

    // Hvis upload fejler stoppes funktionen – vi gemmer ikke en henvendelse uden den fil brugeren forventede at sende.
    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Tilføj dette

    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage
        .from("contact-files")
        .createSignedUrl(fileName, 60 * 60 * 24 * 7);

    fileUrl = signedUrlData?.signedUrl ?? null;
  }

  // Gemmer henvendelsen i Supabase-tabellen contact_submissions.
  // file_url er null hvis ingen fil blev vedhæftet – kolonnen accepterer begge dele.
  const { error } = await supabase
    .from("contact_submissions")
    .insert([{ name, email, phone, message, file_url: fileUrl }]);

  // Hvis Supabase returnerer en fejl stoppes funktionen og der sendes en fejlbesked tilbage.
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Sender en e-mail til Actum med brugerens henvendelse.
  // replyTo: email gør at Actum kan svare direkte til brugeren ved at klikke svar i deres mailklient.
  // Fillinket vises kun i mailen hvis en fil blev uploadet.
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "fridalindbjerg@gmail.com",
    replyTo: email,
    subject: `Ny henvendelse fra ${name}`,
    html: `
      <h2>Ny henvendelse fra kontaktformularen</h2>
      <p><strong>Navn:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Besked:</strong> ${message}</p>
      ${fileUrl ? `<p><strong>Vedhæftet fil:</strong> <a href="${fileUrl}">Download fil</a> (link er gyldigt i 7 dage)</p>` : ""}
    `,
  });

  // Returnerer en succesbesked til frontend når både databaseindsættelse og e-mail er gennemført.
  return NextResponse.json({ success: true });
}
