import { getTranslations } from "next-intl/server";
import Image from "next/image";
import CTAButtonDiscrete from "../(routes)/global_components/cta_button_discrete";

// Server component — henter oversættelser på serversiden
export default async function AboutSection() {
  const t = await getTranslations("about_section");

  return (
    <section className="section pt-12 md:pt-36 content ">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Venstre kolonne — billede */}
        <div className="flex items-center justify-center">
          <div className="relative w-1/2 aspect-3/4 pb-8">
            <Image
              src="/assets/index/actum_facade3.webp"
              alt=""
              fill
              sizes="50vw" // optimeret til at være 1/3 af viewport bredden
              className="object-cover pb-8 md:pb-0"
            />
          </div>
        </div>

        {/* Højre kolonne — tekst, adresse og CTA */}
        <div className="flex flex-col justify-between gap-y-16">
          <p className="indent-20">{t("text")}</p>

          <div className="flex justify-between items-end">
            <p className="font-ocr">
              {t("address")}
              <br />
              {t("city")}
            </p>
            <CTAButtonDiscrete href="/about" label={t("link")} />
          </div>
        </div>
      </div>
    </section>
  );
}
