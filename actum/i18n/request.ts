import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Konfigurerer next-intl til at hente de rigtige oversættelser for hver anmodning.
// getRequestConfig kører på serveren hver gang en bruger besøger en side.
export default getRequestConfig(async ({ requestLocale }) => {
  // Henter det aktuelle sprog fra anmodningen.
  // Hvis intet sprog findes falder den tilbage på standardsproget defineret i routing.ts
  const locale = (await requestLocale) || routing.defaultLocale;

  return {
    locale,
    // Samler alle oversættelsesfiler for det aktuelle sprog til ét objekt.
    // ... spreder indholdet af hver fil ud så de alle ligger på samme niveau.
    // På den måde kan vi bruge t("contact.title") og t("products.title") fra samme sted
    // i stedet for at importere hver fil individuelt i hver komponent.
    messages: {
      ...(await import(`../messages/${locale}/index.json`)).default,
      ...(await import(`../messages/${locale}/global.json`)).default,
      ...(await import(`../messages/${locale}/contact.json`)).default,
      ...(await import(`../messages/${locale}/products.json`)).default,
      ...(await import(`../messages/${locale}/about.json`)).default,
      ...(await import(`../messages/${locale}/cases.json`)).default,
      ...(await import(`../messages/${locale}/faq.json`)).default,
      ...(await import(`../messages/${locale}/singleproduct.json`)).default,
    },
  };
});
