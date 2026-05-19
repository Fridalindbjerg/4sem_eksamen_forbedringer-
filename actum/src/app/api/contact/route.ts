import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextResponse } from "next/server";

// Opretter forbindelse til Supabase med URL og anonym nøgle fra miljøvariablerne
// ! fortæller TypeScript at disse værdier altid er til stede – aldrig undefined
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// POST er en Next.js route handler – den kører når kontaktformularen sendes.
// Den modtager en request med brugerens data og håndterer to ting:
// 1. Gemmer henvendelsen i Supabase så den ikke går tabt
// 2. Sender en e-mail til Actum så de bliver notificeret med det samme

export async function POST(request: Request) {
  // Resend-klienten oprettes inde i handler-funktionen og ikke på modul-niveau.
  // Det sikrer at API-nøglen først læses når ruten kaldes – ikke under Next.js build.
  const resend = new Resend(process.env.RESEND_API_KEY);

  // request er den HTTP-anmodning der kommer ind når formularen sendes.
  // .json() udpakker indholdet og konverterer det fra JSON til et JavaScript-objekt.
  // Vi bruger await fordi det tager et øjeblik at læse og konvertere dataen.
  const body = await request.json();

  // Trækker de fire felter ud af body så vi kan bruge dem direkte som variable.
  // Det er det samme som at skrive const name = body.name, const email = body.email osv.
  const { name, email, phone, message } = body;

  // Gemmer henvendelsen i Supabase-tabellen contact_submissions.
  // Det sikrer at alle henvendelser bliver gemt selvom e-mailen fejler
  const { error } = await supabase
    .from("contact_submissions")
    .insert([{ name, email, phone, message }]);

  // Hvis Supabase returnerer en fejl, stoppes funktionen og der sendes en fejlbesked tilbage
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Sender en e-mail til Actum med brugerens henvendelse.
  // replyTo: email gør at Actum kan svare direkte til brugeren ved at klikke svar i deres mailklient
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
    `,
  });

  // Returnerer en succesbesked til frontend når både databaseindsættelse og e-mail er gennemført
  return NextResponse.json({ success: true });
}
