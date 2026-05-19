import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { Public_Sans } from "next/font/google";
import Footer from "./(routes)/global_components/footer";
import Header from "./(routes)/global_components/header";

// Metadata der vises i browserens fane og bruges af søgemaskiner
export const metadata: Metadata = {
  title: "Actum Design og Tryk",
  description: "Actum Design og Tryk",
};

// Indlæser Public Sans fra Google Fonts og sætter den som en CSS-variabel.
// variable: "--font-sans" gør at vi kan referere til fonten i vores CSS og Tailwind.
// display: "swap" sikrer at teksten vises med en fallback-font mens Public Sans indlæses,
// så siden ikke ser tom ud mens fonten hentes.
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

// LocaleLayout er rod-layoutet for alle sider – det er det der altid er til stede uanset hvilken side brugeren er på.
// Den modtager children som er sidens indhold, og params som indeholder det aktuelle sprog fra URL'en – fx /da eller /en.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Udpakker locale fra params – bruges til at sætte sproget på html-elementet
  const { locale } = await params;

  // Henter alle oversættelser til det aktuelle sprog – sendes videre til NextIntlClientProvider
  // så client components også har adgang til oversættelserne
  const messages = await getMessages();

  return (
    // lang={locale} fortæller browseren og skærmlæsere hvilket sprog siden er på
    <html lang={locale}>
      <head>
        {/* Indlæser OCR-fonten fra Adobe Typekit */}
        <link rel="stylesheet" href="https://use.typekit.net/hga1vzf.css" />
      </head>
      <body className={`${publicSans.variable} antialiased`}>
        <Header />

        {/* NextIntlClientProvider gør oversættelserne tilgængelige for alle client components på sitet.
        Uden den ville client components ikke kunne bruge useTranslations */}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        <Footer />
      </body>
    </html>
  );
}
