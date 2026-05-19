import { defineRouting } from "next-intl/routing";

// Definerer hvordan sprog-routing fungerer på sitet.
// Denne konfiguration bruges af både middleware og next-intl til at håndtere sprog.
export const routing = defineRouting({
  // De sprog sitet understøtter
  locales: ["da", "en"],

  // Sproget brugeren lander på hvis intet andet sprog er specificeret i URL'en
  defaultLocale: "da",

  // Sproget vises altid i URL'en – fx /da/products og /en/products.
  // Uden "always" ville standardsproget ikke have et sprog-præfix i URL'en
  localePrefix: "always",

  // Slår automatisk sprogdetektering fra – sitet skifter ikke automatisk sprog
  // baseret på brugerens browserindstillinger.
  // Brugeren vælger selv sproget via sprogskifteren
  localeDetection: false,
});
