import { getTranslations } from "next-intl/server";
import ContactForm from "../../contact/components/contactform";

//bruger async fordi vi skal hente oversættelserne fra next-intl før vi kan vise dem på siden
export default async function ContactSection() {
  const t = await getTranslations("contact");
  const tAbout = await getTranslations("faq_about");
  return (
    <section className="content">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16">
        <h2 className="font-ocr">{tAbout("h2")}</h2>
        {/* // Kontaktformularen får alle nødvendige labels og fejlbeskeder som
        props, så den kan vise dem på det rigtige sprog */}
        <ContactForm
          submitLabel={t("submit")}
          emailLabel={t("email")}
          nameLabel={t("name")}
          phoneLabel={t("phone")}
          messageLabel={t("message")}
          errorEmail={t("errors.email")}
          errorName={t("errors.name")}
          errorPhone={t("errors.phone")}
          sendingLabel={t("sending")}
          sentLabel={t("sent")}
          errorLabel={t("error")}
        />
      </div>
    </section>
  );
}
