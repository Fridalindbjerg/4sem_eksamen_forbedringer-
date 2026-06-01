import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ContactForm from "./components/contactform";
import CalEmbed from "./components/calembed";

export default async function ContactPage() {
  // Henter oversættelser fra kontakt-nøglen i da.json / en.json
  const t = await getTranslations("contact");

  return (
    <main className="full-bleed grid grid-cols-subgrid ">
      <section className="section gap-10 md:gap-20 content grid grid-cols-1 md:grid-cols-2 md:pt-4">
        {/* Billede i venstre kolonne */}
        <div className="relative h-40 md:h-full">
          <Image
            src="/assets/contact/contact_image.png"
            alt="Actum værksted"
            sizes="full-width"
            priority
            fill
            className="object-cover w-auto h-auto"
          />
        </div>
        {/* Formular i højre kolonne */}
        <div className="pt-0">
          <h1>{t("title")}</h1>
          <p className="indent-25 py-8">{t("description")}</p>
          {/* ContactForm er en klientkomponent og kan ikke bruge t() selv.
              Oversættelser sendes derfor som props fra denne serverkomponent.
              Zod-valideringsfejlmeddelelser sendes også som props, så de kan oversættes.*/}
          <ContactForm
            submitLabel={t("submit")}
            emailLabel={t("email")}
            nameLabel={t("name")}
            phoneLabel={t("phone")}
            messagePlaceholder={t("messagePlaceholder")}
            errorEmail={t("errors.email")}
            errorName={t("errors.name")}
            errorPhone={t("errors.phone")}
            sendingLabel={t("sending")}
            sentLabel={t("sent")}
            errorLabel={t("error")}
          />
        </div>
      </section>

      {/* Cal.com booking */}
      <section className="section gap-10 md:gap-20 content grid grid-cols-1 md:grid-cols-2">
        {/* Tekst i venstre kolonne */}
        <div>
          <h2>{t("booking.title")}</h2>
          <p className="indent-25 py-8">{t("booking.description")}</p>
        </div>
        {/* Kalender i højre kolonne */}
        <div className="flex justify-center">
          <CalEmbed />
        </div>
      </section>
    </main>
  );
}
